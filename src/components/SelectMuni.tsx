import { useDashboard } from "@/context/DashboardContext";
import { useState } from "react";

export const SelectMuni = () => {
  const { setMunicipality, municipalityAvaible } = useDashboard();

  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleMuniChange = (muni: string) => {
    setMunicipality(muni);
    setIsDropdownOpen(false); // fecha o dropdown após selecionar uma opção
  };

  const filteredMunicipalities = municipalityAvaible.filter((muni) =>
    muni.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-[45%]">
      <input
        type="text"
        placeholder="Pesquisar município"
        value={searchTerm}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Abre dropdown ao clicar
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-400 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isDropdownOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-400 rounded-md max-h-48 overflow-y-auto mt-1">
          {filteredMunicipalities.map((muni) => (
            <li
              key={muni}
              onClick={() => {
                handleMuniChange(muni);
                setSearchTerm(muni);
              }}
              className="p-2 cursor-pointer hover:bg-blue-100"
            >
              {muni}
            </li>
          ))}
          {filteredMunicipalities.length === 0 && (
            <li className="p-2 text-gray-500">Nenhum município encontrado</li>
          )}
        </ul>
      )}
    </div>
  );
};
