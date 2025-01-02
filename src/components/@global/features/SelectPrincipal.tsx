import { useEffect, useState } from "react";
import FocusHidden from "./FocusHidden";

const SelectPrincipal = ({
  options,
  filters,
  setFilters,
  label,
  placeholder,
  noRecife = true,
  notFoundMessage,
  unique = false,
  initialValue,
  search = true,
}: {
  options: any[];
  filters: any[];
  setFilters: (val: any) => void;
  label: string;
  placeholder: string;
  noRecife?: boolean;
  notFoundMessage: string;
  unique?: boolean;
  initialValue?: any;
  search?: boolean;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdown, setDropdown] = useState<boolean>(false);

  const optionsCopy = [...options];

  useEffect(() => {
    if (initialValue) {
      setFilters([initialValue]);
      setSearchTerm(`${initialValue}`);
    }
  }, []);

  // Remover 'Recife' das opções se a flag `noRecife` for verdadeira
  const recifeIndex = options.indexOf("Recife");
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
      setFilters([value]);
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
        className="block text-gray-700 font-semibold mb-2"
      >
        {label}
      </label>
      <input
        type="text"
        id="municipio"
        className="p-2 border rounded-lg w-full"
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
          style="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-30"
        >
          <div className="p-4 max-h-60 overflow-y-auto">
            {optionsCopy.filter((option) =>
              option
                .toLocaleLowerCase()
                .includes(search ? searchTerm.toLocaleLowerCase() : "")
            ).length > 0 ? (
              optionsCopy
                .filter((option) =>
                  option
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

      <p className="text-gray-700 font-semibold text-sm mt-2">
        Comparando com: {filters.length ? filters.join(", ") : "nenhum"}
      </p>
    </div>
  );
};

export default SelectPrincipal;
