import React, { useEffect, useState } from "react";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import cards from "./@imports/cards";
import charts from "./@imports/charts";
import tables from "./@imports/tables";

const SearchCompare = ({
  options,
  filters,
  setFilters,
}: {
  options: any[];
  filters: any[];
  setFilters: (val: any) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdown, setDropdown] = useState<boolean>(false);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleSelectCheck = (value: string) => {
    if (filters.includes(value)) {
      setFilters(filters.filter((item: string) => item !== value));
    } else {
      setFilters([...filters, value]);
    }
  };


  return (
    <div className="mb-6 relative">
      <label
        htmlFor="municipio"
        className="block text-gray-700 font-semibold mb-2"
      >
        Compare Aeroportos
      </label>
      <input
        type="text"
        id="municipio"
        className="p-2 border rounded-lg w-full"
        placeholder="Digite para buscar um aeroporto"
        value={searchTerm}
        onClick={() => {
          toggleDropdown();
          setSearchTerm("");
        }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {dropdown && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="p-4 max-h-60 overflow-y-auto">
            {options
              .filter((filter) =>
                filter
                  .toLocaleLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
              )
              .slice()
              .sort((a: any, b: any) => a - b)
              .map((option: string) => (
                <label
                  key={option}
                  className="cursor-pointer flex items-center gap-2 py-1 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={filters.includes(option)}
                    onChange={() => {
                      handleSelectCheck(option);
                    }}
                    className="cursor-pointer form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="truncate">{option}</span>
                </label>
              ))}
          </div>
        </div>
      )}

      <p className="text-gray-700 font-semibold text-sm mt-2">
        Comparando com: {filters.length ? filters.join(", ") : "nenhum"}
      </p>
    </div>
  );
};

const Comparativo = ({year, tempMuni, data }: {year: string, tempMuni?: any; data: any[] }) => {
  const [pageCompare, setPageCompare] = useState(0);
  const [tempFiltred, setTempFiltred] = useState([]);
  // const tempFiltred = ["Rio De Janeiro", "Salvador", "Confins"];
  const [tablesRender, setTablesRender] = useState(tables)

console.log('YEAR', year)

  useEffect(() =>{
    const getNewTables = tempFiltred.map((val) => {
      console.log(val)
      return {
              Component: React.lazy(
                () =>
                  import(
                    "@/components/@build/observatorio/tables/aeroporto/comparativo/AirportInfo"
                  )
              ),
             }
    })
    console.log(getNewTables)

    setTablesRender([...tables, ...getNewTables])
  }, [tempFiltred])

  return (
    <div>
      {/*  */}
      <SearchCompare
        options={tempMuni}
        filters={tempFiltred}
        setFilters={setTempFiltred}
      />

      <div className="flex justify-between items-center gap-2">
        <button
          className="border transition duration-500 hover:bg-slate-200 bg-white rounded-full w-10 h-10 flex items-center justify-center"
          onClick={() => {
            if (pageCompare === 0) {
              setPageCompare(tempFiltred.length - 1);
            } else {
              setPageCompare(pageCompare - 1);
            }
          }}
        >
          <svg
            className={`h-4 w-4 text-gray-500 transition-transform duration-200 rotate-90`}
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8l4 4 4-4" />
          </svg>
        </button>

        <div className="w-[85%] flex flex-wrap gap-4 justify-center mb-2">
          {tempFiltred.map((toCompare: string) => {
            return cards.map(({ Component }, index) => (
              <React.Suspense fallback={<div>Loading...</div>} key={index}>
                <div
                  className={`${
                    toCompare === tempFiltred[pageCompare] ? "" : "hidden"
                  } flex-1`}
                >
                  <Component
                    local={"Recife"}
                    toCompare={toCompare}
                    data={data}
                    year={year}
                    color={ColorPalette.default[index]}
                  />
                </div>
              </React.Suspense>
            ));
          })}
        </div>

        <button
          className="border transition duration-500 hover:bg-slate-200 bg-white rounded-full w-10 h-10 flex items-center justify-center"
          onClick={() => {
            if (pageCompare === tempFiltred.length - 1) {
              setPageCompare(0);
            } else {
              setPageCompare(pageCompare + 1);
            }
          }}
        >
          <svg
            className={`h-4 w-4 text-gray-500 transition-transform duration-200 -rotate-90`}
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8l4 4 4-4" />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-center mb-6 gap-2">
        {tempFiltred.map((_, i) => {
          console.log(i);
          return (
            <button
              key={i}
              onClick={() => setPageCompare(i)}
              className={`transition duration-200 hover:bg-slate-200 h-4 w-4 ${
                pageCompare === i ? "bg-slate-500" : "bg-white"
              } rounded-full border`}
            ></button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {charts.map(({ Component }, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 w-100 flex flex-col items-center"
          >
            <React.Suspense fallback={<div>Loading...</div>}>
              <Component data={data} toCompare={["Recife", ...tempFiltred]} />
            </React.Suspense>
          </div>
        ))}
         {tablesRender.map(({ Component }, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 w-100 flex flex-col items-center"
          >
            <React.Suspense fallback={<div>Loading...</div>}>
              <Component airport={["Recife", ...tempFiltred][index]} color={ColorPalette.default[index]} data={data} year={year}  />
            </React.Suspense>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comparativo;
