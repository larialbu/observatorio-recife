"use client"; 
import Image from "next/image";
import { SetStateAction, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importando o CSS do react-datepicker

const Navbar = () => {
  const [filterType, setFilterType] = useState("diario");
  const [timePeriod, setTimePeriod] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined); // Alterado para undefined
  const [endDate, setEndDate] = useState<Date | undefined>(undefined); // Alterado para undefined

  const handleFilterChange = (event: { target: { value: any; }; }) => {
    const newFilterType = event.target.value;
    setFilterType(newFilterType);
    // Reset timePeriod and date ranges based on filter type
    setTimePeriod(""); // Reset time period for all filter types
    setStartDate(undefined); // Reset start date to undefined
    setEndDate(undefined); // Reset end date to undefined
  };

  const handleTimePeriodChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setTimePeriod(event.target.value);
  };

  // Get current year and months
  const currentYear = new Date().getFullYear();
  const currentDay = new Date().getDate(); // Get current day
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1); // Days 1-31
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i); // Last 10 years

  // Set the initial state for timePeriod based on the current day
  useEffect(() => {
    if (filterType === "diario") {
      setTimePeriod(currentDay.toString()); // Set to current day when filter type is "diario"
    }
  }, [filterType, currentDay]);

  return (
    <div className='flex items-center justify-between p-4'>
      {/* FILTERS */}
      <div className='flex items-center gap-4 ml-auto'>
        {/* Filter Type */}
        <select
          value={filterType}
          onChange={handleFilterChange}
          className="p-2 border border-gray-400 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="diario">Diário</option>
          <option value="mensal">Mensal</option>
          <option value="anual">Anual</option>
          <option value="intervalo">Intervalo de Datas</option> {/* Nova opção de intervalo */}
        </select>
        
        {/* Time Period */}
        {filterType === "intervalo" ? (
          <div className="flex gap-2">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date ?? undefined)} // Altera de null para undefined
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="p-2 border border-gray-400 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholderText="Data Inicial"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date ?? undefined)} // Altera de null para undefined
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              className="p-2 border border-gray-400 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholderText="Data Final"
            />
          </div>
        ) : (
          <select
            value={timePeriod}
            onChange={handleTimePeriodChange}
            className="p-2 border border-gray-400 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {filterType === "diario" && days.map(day => (
              <option key={day} value={day}>{`Dia ${day}`}</option>
            ))}
            {filterType === "mensal" && months.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
            {filterType === "anual" && years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        )}

        {/* SEARCH BAR (não foi alterada) */}
        <div className='flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2'>
          <Image src="/search.png" alt="Pesquisar" width={14} height={14} />
          <input
            type="text"
            placeholder="Pesquisar..."
            className="w-[200px] p-2 bg-transparent outline-none rounded-md border border-gray-400"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
