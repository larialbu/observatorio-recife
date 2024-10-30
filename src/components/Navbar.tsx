"use client";
import Image from "next/image";
import { useDashboard } from "@/context/DashboardContext";
import { useState } from "react";
import { SelectMuni } from "./SelectMuni";

const Navbar = () => {
  const { availableYears, year, setYear } = useDashboard();

  const handleTimePeriodChange = (event: { target: { value: string } }) => {
    setYear(event.target.value);
  };

  return (
    <div className="flex items-center justify-between p-4">
      {/* FILTERS */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Combobox de municípios */}
        <SelectMuni />

        <select
          value={year}
          onChange={handleTimePeriodChange}
          className="w-[30%] p-2 border border-gray-400 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* SEARCH BAR */}
        <div className="flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
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
