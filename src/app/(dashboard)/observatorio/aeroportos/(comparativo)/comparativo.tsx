import React, { useEffect, useState } from "react";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import cards from "./@imports/cards";
import charts from "./@imports/charts";
import tables from "./@imports/tables";
import FocusHidden from "@/components/@global/features/FocusHidden";
import SelectPrincipal from "@/components/@global/features/SelectPrincipal";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";

const Comparativo = ({
  year,
  toCompare,
  data,
}: {
  year: string;
  toCompare?: any;
  data: any[];
}) => {
  const [pageCompare, setPageCompare] = useState(0);
  const [tempFiltred, setTempFiltred] = useState([]);
  // const tempFiltred = ["Rio De Janeiro", "Salvador", "Confins"];
  const [tablesRender, setTablesRender] = useState(tables);


  useEffect(() => {
    const getNewTables = tempFiltred.map((val) => {
      return {
        Component: React.lazy(
          () =>
            import(
              "@/components/@build/observatorio/tables/aeroporto/comparativo/AirportInfo"
            )
        ),
      };
    });

    setTablesRender([...tables, ...getNewTables]);
  }, [tempFiltred]);

  return (
    <div>
      {/*  */}
      <SelectPrincipal
        options={toCompare}
        filters={tempFiltred}
        setFilters={setTempFiltred}
        label="Compare Aeroportos"
        placeholder="Digite para buscar um aeroporto"
        notFoundMessage="Nenhum aeroporto encontrado"
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

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {charts.map(({ Component }, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 w-100 flex flex-col items-center"
            >
              <React.Suspense fallback={<GraphSkeleton />}>
                <Component data={data} toCompare={["Recife", ...tempFiltred]} />
              </React.Suspense>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {tablesRender.map(({ Component }, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 w-100 flex flex-col items-center"
            >
              <React.Suspense fallback={<div>Loading...</div>}>
                <Component
                  airport={["Recife", ...tempFiltred][index]}
                  color={ColorPalette.default[index]}
                  data={data}
                  year={year}
                />
              </React.Suspense>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comparativo;
