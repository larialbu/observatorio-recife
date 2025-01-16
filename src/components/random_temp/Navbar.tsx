"use client";

import { useDashboard } from "@/context/DashboardContext";
import { useState, useEffect } from "react";
import FocusHidden from "../@global/features/FocusHidden";

const ChevronIcon = ({ up = false }: { up?: boolean }) => (
  <svg
    className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
      up ? "rotate-180" : ""
    }`}
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 8l4 4 4-4" />
  </svg>
);

const Navbar = () => {
  const { filters, setFilters, resetFilters } = useDashboard();
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);
  const [dropdowns, setDropdowns] = useState<Record<string, boolean>>({});
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});

  useEffect(() => {
    setTempFilters(filters); // Atualiza os filtros temporários ao mudar os filtros globais
  }, [filters]);

  const toggleDropdown = (label: string) => {
    setDropdowns((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleCheckboxChange = (label: string, option: string) => {
    setTempFilters((prev) => {
      const updatedFilters = prev.additionalFilters.map((filter) =>
        filter.label === label
          ? {
              ...filter,
              selected: filter.selected.includes(option)
                ? filter.selected.filter((item: string) => item !== option)
                : [...filter.selected, option],
            }
          : filter
      );
      return { ...prev, additionalFilters: updatedFilters };
    });
  };

  const handleSelectAll = (label: string) => {
    setTempFilters((prev) => {
      const updatedFilters = prev.additionalFilters.map((filter) =>
        filter.label === label
          ? {
              ...filter,
              selected:
                filter.selected.length === filter.options.length
                  ? []
                  : [...filter.options],
            }
          : filter
      );
      return { ...prev, additionalFilters: updatedFilters };
    });
  };

  const handleSearchChange = (label: string, value: string) => {
    setSearchTerms((prev) => ({ ...prev, [label]: value }));
  };

  const applyFilters = () => {
    setFilters(tempFilters); // isso dispara o segundo useEffect
    setFiltersVisible(false);
    console.log(filters)
    console.log(tempFilters)
  };
  

  return (
    <div className="w-full bg-gray-50 flex flex-col items-start gap-4 py-4 px-4 sm:px-6 lg:px-8 z-40">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setFiltersVisible(!filtersVisible);
        }}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300 transition"
      >
        {filtersVisible ? "Esconder Filtros" : "Exibir Filtros"}
        <ChevronIcon up={filtersVisible} />
      </button>

      <div className="w-full text-sm text-gray-700 flex flex-col gap-4 p-4 bg-white shadow-md rounded-lg">
        <span className="font-medium text-lg text-gray-800">Filtros selecionados:</span>
        <ul className="flex flex-wrap gap-4">
          <li className="flex items-center gap-1">
            <span className="text-gray-600">Ano:</span>
            <span className="font-semibold text-gray-900">{filters.year || 2024}</span>
          </li>

          {filters.additionalFilters?.map((filter: any) => {
            if (filter.selected?.length > 0) {
              const visibleItems = filter.selected.slice(0, 5);
              const remainingCount = filter.selected.length - 5;

              return (
                <li key={filter.label} className="flex items-center gap-1">
                  <span className="text-gray-600">{filter.label}:</span>
                  <span className="font-semibold text-gray-900">
                    {visibleItems.join(", ")}
                    {remainingCount > 0 && (
                      <span className="text-blue-600">
                        ... e outros {remainingCount}
                      </span>
                    )}
                  </span>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>

      {filtersVisible && tempFilters && (
        <FocusHidden open={filtersVisible} setOpen={setFiltersVisible}>
          <div className="absolute w-[max-content] rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Filtros</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-medium text-gray-600 block mb-1">ANO</label>
                <select
                  value={tempFilters.year}
                  onChange={(e) =>
                    setTempFilters((prev) => ({ ...prev, year: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {filters.years.map((year: string) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {tempFilters.additionalFilters?.map((filter: any) => (
                <div key={filter.label} className="relative flex flex-col">
                  <label className="text-xs font-medium text-gray-600 block mb-1">
                    {filter.label}
                  </label>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(filter.label);
                    }}
                    className="w-full flex justify-between items-center px-3 py-2 border border-gray-300 rounded-md text-left text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span className="truncate">
                      {filter.selected.length > 0
                        ? `${filter.selected.length} selecionado(s)`
                        : "Nenhum selecionado"}
                    </span>
                    <ChevronIcon up={dropdowns[filter.label]} />
                  </button>

                  {dropdowns[filter.label] && (
                    <FocusHidden
                      open={dropdowns[filter.label]}
                      setOpen={(val) =>
                        setDropdowns((prev) => ({ ...prev, [filter.label]: val }))
                      }
                    >
                      <div className="p-4 max-h-60 overflow-y-auto bg-white shadow-md">
                        <input
                          type="text"
                          placeholder="Pesquisar..."
                          value={searchTerms[filter.label] || ""}
                          onChange={(e) =>
                            handleSearchChange(filter.label, e.target.value)
                          }
                          className="w-full mb-2 px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => handleSelectAll(filter.label)}
                          className="text-blue-600 font-medium hover:underline block"
                        >
                          {filter.selected.length === filter.options.length
                            ? "Desselecionar Todos"
                            : "Selecionar Todos"}
                        </button>
                        {filter.options
                          .filter((option: string) =>
                            option
                              .toLowerCase()
                              .includes((searchTerms[filter.label] || "").toLowerCase())
                          )
                          .map((option: string) => (
                            <label
                              key={option}
                              className="flex items-center gap-2 py-1 text-sm"
                            >
                              <input
                                type="checkbox"
                                checked={filter.selected.includes(option)}
                                onChange={() => handleCheckboxChange(filter.label, option)}
                                className="form-checkbox h-4 w-4 text-blue-600 rounded"
                              />
                              {option}
                            </label>
                          ))}
                      </div>
                    </FocusHidden>
                  )}
                </div>
              ))}

              <div className="col-span-full flex justify-end gap-4 mt-4">
                <button
                  onClick={resetFilters}
                  className="bg-gray-100 px-4 py-2 rounded-md text-gray-700 font-medium hover:bg-gray-200"
                >
                  Limpar Filtros
                </button>
                <button
                  onClick={applyFilters}
                  className="bg-blue-600 px-4 py-2 rounded-md text-white font-medium hover:bg-blue-700"
                >
                  Aplicar Filtros
                </button>
              </div>
            </div>
          </div>
        </FocusHidden>
      )}
    </div>
  );
};

export default Navbar;
