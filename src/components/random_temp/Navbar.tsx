"use client";

import Image from "next/image";
import { useDashboard } from "@/context/DashboardContext";
import { useState, useEffect } from "react";
import { aeroportosFilters } from "@/utils/filters/aeroportoFilters";

const Navbar = () => {
  const { filters, setFilters } = useDashboard();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Inicializa os filtros com base na rota atual
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      ...aeroportosFilters, // Carrega os filtros específicos da rota, loucura isso aqui
    }));
  }, [setFilters]);

  const handleTimePeriodChange = (event: { target: { value: string } }) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      year: event.target.value, // Atualiza o ano diretamente nos filtros
    }));
  };

  const handleFilterChange = (filterLabel: string, value: string) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      additionalFilters: prevFilters.additionalFilters.map((filter: any) =>
        filter.label === filterLabel ? { ...filter, value } : filter
      ),
    }));
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4 ml-auto">
        {/* Filtro de Ano */}
        {isClient && (
          <select
            value={filters.year}
            onChange={handleTimePeriodChange}
            className="w-[30%] p-2 ring-[1.5px] ring-gray-300 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {filters.years?.map((filterYear: string) => (
              <option key={filterYear} value={filterYear}>
                {filterYear}
              </option>
            ))}
          </select>
        )}

        {/* Filtros Adicionais */}
        {filters.additionalFilters?.map((filter: any, index: number) => (
          <select
            key={index}
            className="w-[30%] p-2 ring-[1.5px] ring-gray-300 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleFilterChange(filter.label, e.target.value)}
          >
            <option value="">{filter.label}</option>
            {filter.options.map((option: string, optionIndex: number) => (
              <option key={optionIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
        ))}

        {/* Barra de Pesquisa */}
        <div className="flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2 bg-white">
          <Image src="/search.png" alt="Pesquisar" width={14} height={14} />
          <input
            type="text"
            placeholder="Pesquisar..."
            className="w-[100%] p-2 bg-transparent outline-none rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
