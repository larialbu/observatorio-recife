import { useEffect, useState } from "react";
import FocusHidden from "./FocusHidden";

const SelectPrincipal = ({
  options,
  filters,
  setFilters,
  noRecife = true,
  unique = false,
  search = true,
  label="Compare Municípios",
  placeholder="Digite para buscar um Município",
  notFoundMessage="Nenhum Município encontrado",
  initialValue
}: {
  options: any[];
  filters: any[];
  setFilters: (val: any) => void;
  label?: string;
  placeholder?: string;
  noRecife?: boolean;
  notFoundMessage?: string;
  unique?: boolean;
  initialValue?: any;
  search?: boolean;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdown, setDropdown] = useState<boolean>(false);

  const optionsCopy = [...options];

  useEffect(() => {
    if (initialValue) {
      setFilters(initialValue);
    }
  }, []);

  // Remover 'Recife' das opções se a flag `noRecife` for verdadeira
  const recifeOption = options.filter((option: string) => option.toLowerCase().includes('recife'))
  const recifeIndex = options.indexOf(recifeOption[0]);
  if (noRecife && recifeIndex !== -1) {
    optionsCopy.splice(recifeIndex, 1);
  }

  const handleSelectCheck = (value: string) => {
    const includes = filters.includes(value);

    // Adiciona ou remove o valor do filtro
    if (includes && !unique) {
      setFilters(filters.filter((item: string) => item !== value));
    } else if (!includes && !unique) {
      setFilters([...filters, value]);
    } else if (includes && unique) {
      setFilters([...filters.filter((item: string) => item !== value)]);
      setSearchTerm(`${value}`);
    } else if (!includes && unique) {
      setFilters([value]);
      setSearchTerm(`${value}`);
    }
  };

  return (
    <div className="mb-6 relative">
      <label
        htmlFor="municipio"
        className="flex items-center text-gray-700 gap-[4px] font-semibold mb-2 text-2xl"
      > 
        <svg
        width="25px" 
        height="25px" 
        viewBox="0 0 24 24" 
        id="analysis-left" 
        data-name="Flat Line" 
        xmlns="http://www.w3.org/2000/svg" 
        className="icon flat-line">
          <circle id="secondary" style={{ fill: "transparent", strokeWidth: "2" }} cx="8" cy="10" r="3" />
          <path id="primary" d="M5.83,12.12,3,15M8,7a3,3,0,1,0,3,3A3,3,0,0,0,8,7Zm3,10h6m-2-4h2" 
          style={{fill: "none", stroke: "oklch(0.373 0.034 259.733)", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3"}}/>
          <path id="primary-2" data-name="primary" d="M8,3H20a1,1,0,0,1,1,1V20a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V17" 
          style={{fill: "none", stroke: "oklch(0.373 0.034 259.733)", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3"}}/>
        </svg>
        {label}
      </label>

      <svg
          className="absolute left-2 top-[56%] -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M12.9 14.32a8 8 0 111.414-1.414l3.356 3.356a1 1 0 01-1.414 1.414l-3.356-3.356zM8 14a6 6 0 100-12 6 6 0 000 12z"
            clipRule="evenodd"
          />
      </svg>

      <input
        type="text"
        id="municipio"
        className="p-2 pl-8 border rounded-lg w-full"
        placeholder={placeholder}
        value={searchTerm}
        onClick={(e) => {
          e.stopPropagation(); // Previne o fechamento do dropdown ao clicar no input
          setDropdown(true); // Exibe o dropdown
        }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {dropdown && (
        <FocusHidden
          open={dropdown}
          setOpen={setDropdown}
      
        >
          <div className="p-4 max-h-60 overflow-y-auto absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-30">
            {optionsCopy.filter((option) => !!option && option
                .toLocaleLowerCase()
                .includes(search ? searchTerm.toLocaleLowerCase() : "") 
            ).length > 0 ? (
              optionsCopy
                .filter((option) =>
                  !!option && option
                    .toLocaleLowerCase()
                    .includes(search ? searchTerm.toLocaleLowerCase() : "")
                )
                .map((option: string) => (
                  <label
                    key={option}
                    className="cursor-pointer flex items-center gap-2 py-1 text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={filters.includes(option)}
                      onChange={() => handleSelectCheck(option)}
                      className="cursor-pointer form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="truncate">{option}</span>
                  </label>
                ))
            ) : (
              <p className="text-sm text-gray-700 p-1 text-center">
                {notFoundMessage}
              </p>
            )}
          </div>
        </FocusHidden>
      )}

      <p className="text-gray-700 font-medium text-sm mt-2">
        Comparando com: {filters.length ? filters.join(", ") : "nenhum"}
      </p>
    </div>
  );
};

export default SelectPrincipal;
