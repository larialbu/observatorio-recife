"use client";
import Image from "next/image";
import { useDashboard } from "@/context/DashboardContext";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { availableYears, year, setYear } = useDashboard();
  const [isClient, setIsClient] = useState(false);

  // Verifica se estamos no lado do cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleTimePeriodChange = (event: { target: { value: string } }) => {
    setYear(event.target.value);
  };

  const isSelectVisible =
    isClient &&
    (window.location.pathname === "/observatorio/aeroportos" ||
      window.location.pathname === "/observatorio/bal-comercial");

  return (
    <div className="flex items-center justify-between p-4">
      {/* Filtros */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Seleção de Ano */}
        {isSelectVisible && (
          <select
            value={year}
            onChange={handleTimePeriodChange}
            className="w-[30%] p-2 ring-[1.5px] ring-gray-300 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        )}

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
