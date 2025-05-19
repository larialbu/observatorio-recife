import { useEffect, useState } from "react";
import FocusHidden from "./FocusHidden";
import { ChevronIcon } from "@/components/random_temp/ChevronIcon";

const SelectCompare = ({
  options,
  filters,
  setFilters,
  noRecife = false,
  label="",
  initialValue
}: {
  options: any[];
  filters: any;
  setFilters: (val: any) => void;
  label?: string;
  placeholder?: string;
  noRecife?: boolean;
  initialValue?: any;
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
  const recifeOption = options?.filter((option: string) => option?.toLowerCase().includes('recife'))
  const recifeIndex = options.indexOf(recifeOption[0]);
  if (noRecife && recifeIndex !== -1) {
    optionsCopy.splice(recifeIndex, 1);
  }


  return (
    <div className="relative flex flex-col">
        <label className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">{label}</label>
        <button
        onClick={() => {
            setDropdown(true);
        }}
        className="bg-white dark:bg-[#0C1B2B] max-w-[200px] flex justify-between items-center px-3 py-2 border dark:border-gray-600 rounded-md text-sm"
        >
        <span>
            {filters}
        </span>
        <ChevronIcon up={dropdown} />
        </button>

        {dropdown && (
            <FocusHidden
                open={dropdown}
                setOpen={(val) => setDropdown(val)}
            > 
                <div className="absolute z-50 mt-1 p-4 bg-white dark:bg-[#1d2b3d] border dark:border-gray-600 shadow-md max-h-60 overflow-y-auto">
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={searchTerm || ""}
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                    }}
                    className="border rounded mb-2 px-2 py-1 text-sm w-full dark:bg-[#0C1B2B] dark:text-white dark:border-gray-600"
                />

                {options
                    .sort((a: string, b: string) => {
                    const numA = parseFloat(a);
                    const numB = parseFloat(b);

                    if (!isNaN(numA) && !isNaN(numB)) {
                        return numA - numB; // ordem numérica
                    }
                    return a.localeCompare(b, undefined, { sensitivity: "base" });
                    })
                    .filter((op: string) => {
                    const search = searchTerm || "";
                    
                    if (typeof op === "string") {
                        return op.toLowerCase().includes(search.toLowerCase());
                    }
                    return String(op).includes(search);
                    })
                    .map((op: string) => (
                    <label key={op} className="flex items-center gap-2 py-1 text-sm">
                        <input
                        type="checkbox"
                        checked={filters.includes(op)}
                        onChange={(e) => {
                            setFilters(op)
                        }}
                        className="h-4 w-4 text-blue-600"
                        />
                        {op}
                    </label>
                    ))}
                </div>
            </FocusHidden>
        )}
    </div>
  );
};

export default SelectCompare;