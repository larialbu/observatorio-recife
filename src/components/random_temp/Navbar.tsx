import { useDashboard } from "@/context/DashboardContext";
import { useState, useEffect } from "react";
import { defaultFilters } from "@/utils/filters/defaultFilters";
import FocusHidden from "../@global/features/FocusHidden";
import { useNavbarHandlers } from "@/functions/@global/NavbarHandlers";

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
  const { filters, setFilters } = useDashboard();
  const [isClient, setIsClient] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);

  const {
    dropdowns,
    tempFilters,
    searchTerms,
    toggleDropdown,
    handleTimePeriodChange,
    handleCheckboxChange,
    handleSelectAll,
    applyFilters,
    handleSearchChange,
    setTempFilters,
    setDropdowns
  } = useNavbarHandlers();


  useEffect(() => {
    setIsClient(true);
    setTempFilters((prevFilters: any) => ({
      ...filters,
      year: filters.year || filters.years[filters.years.length - 1] || defaultFilters.years[defaultFilters.years.length - 1],
      additionalFilters:
        filters.additionalFilters || defaultFilters.additionalFilters,
    }));
  }, [filters]);

  return (
    <div className="w-full bg-gray-50 min-h-[70px] flex flex-col items-start gap-4 py-4 px-4 sm:px-6 lg:px-8 z-40">
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

      {filtersVisible && tempFilters && (
        <FocusHidden
          open={filtersVisible}
          setOpen={setFiltersVisible}
          style="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-base font-semibold text-gray-800 mb-4">Filtros</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label className="text-xs font-medium text-gray-600 block mb-1">ANO</label>
              <select
                value={tempFilters.year}
                onChange={handleTimePeriodChange}
                className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 text-sm text-gray-700 transition"
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
                  className="w-full flex justify-between items-center px-3 py-2 border border-gray-300 rounded-md text-left text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
                >
                  <span className="truncate">{filter.label}</span>
                  <ChevronIcon up={dropdowns[filter.label]} />
                </button>

                {dropdowns[filter.label] && (
                  <FocusHidden
                    open={dropdowns[filter.label]}
                    setOpen={(val: boolean) =>
                      setDropdowns((prev) => ({ ...prev, [filter.label]: val }))
                    }
                    style="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10"
                  >
                    <div className="p-4 max-h-60 overflow-y-auto">
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
                        className="text-blue-600 font-medium hover:underline block focus:outline-none"
                      >
                        {filter.selected?.length === filter.options.length
                          ? "Desselecionar Todos"
                          : "Selecionar Todos"}
                      </button>

                      {filter.options
                        .filter((option: string) =>
                          option
                            .toLowerCase()
                            .includes(
                              (searchTerms[filter.label] || "").toLowerCase()
                            )
                        )
                        .map((option: string) => (
                          <label
                            key={option}
                            className="flex items-center gap-2 py-1 text-sm text-gray-700"
                          >
                            <input
                              type="checkbox"
                              checked={filter.selected?.includes(option) || false}
                              onChange={() => handleCheckboxChange(filter.label, option)}
                              className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="truncate">{option}</span>
                          </label>
                        ))}
                    </div>
                  </FocusHidden>
                )}
              </div>
            ))}

            <div className="col-span-full flex justify-end mt-4">
              <button
                onClick={applyFilters}
                className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
        </FocusHidden>
      )}
    </div>
  );
};

export default Navbar;
