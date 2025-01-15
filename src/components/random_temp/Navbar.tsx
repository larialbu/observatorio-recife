import { useDashboard } from "@/context/DashboardContext";
import { useState, useEffect } from "react";
import { FilterDropdown } from "@/utils/filters/FilterDropdown";

const Navbar = () => {
  const { filters, setFilters, resetFilters } = useDashboard();
  const [tempFilters, setTempFilters] = useState(filters);

  useEffect(() => {
    setTempFilters(filters); // Atualiza os filtros temporários ao mudar os filtros globais
  }, [filters]);

  const applyFilters = () => {
    setFilters(tempFilters); // Aplica os filtros temporários ao contexto
  };

  return (
    <div className="w-full bg-gray-50 flex flex-col items-start gap-4 py-4 px-4 sm:px-6 lg:px-8 z-40">
      <h2 className="text-lg font-semibold text-gray-800">Filtros</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Filtro de Ano */}
        <FilterDropdown
          label="Ano"
          options={filters.years || []}
          selected={[tempFilters.year]}
          onChange={(selected) => setTempFilters({ ...tempFilters, year: selected[0] })}
        />

        {/* Filtros adicionais */}
        {filters.additionalFilters?.map((filter) => (
          <FilterDropdown
            key={filter.label}
            label={filter.label}
            options={filter.options}
            selected={filter.selected}
            onChange={(selected) => {
              const updatedFilters = tempFilters.additionalFilters.map((f) =>
                f.label === filter.label ? { ...f, selected } : f
              );
              setTempFilters({ ...tempFilters, additionalFilters: updatedFilters });
            }}
          />
        ))}
      </div>

      <div className="flex justify-end gap-4 w-full mt-4">
        <button
          onClick={resetFilters}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Limpar Filtros
        </button>
        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
};

export default Navbar;
