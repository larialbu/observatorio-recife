import React, { useEffect, useState } from "react";

import { IpcaGeralData } from "@/@types/observatorio/@data/ipcaData";
import { IpcaGeralHeaders, IpcaTabelaHeaders } from "@/@types/observatorio/@fetch/ipca";
import SelectPrincipal from "@/components/@global/features/SelectPrincipal";
import { useDashboard } from "@/context/DashboardContext";
import { getUniqueValues } from "@/utils/filters/@global/getUniqueValues";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import cards from "./@imports/cards";
import tables from "./@imports/tables";



const Analitico = ({
  year,
  monthRecent,
}: {
  year: string;
  monthRecent?: number;
}) => {
  const { data } = useDashboard();
  const [tempFiltred, setTempFiltred] = useState([]);
  const [tablesRender, setTablesRender] = useState(tables);
  const [analiticoData, setAnaliticoData] = useState<IpcaTabelaHeaders[]>([]);
  const [geralData, setGeralData] = useState<IpcaGeralHeaders[]>([]);
  const [pageCompare, setPageCompare] = useState(0);
  const [animationClass, setAnimationClass] = useState("card-enter");

  useEffect(() => {
    if (data) {
      const analitico = (data as { tabelas: { filteredData: IpcaTabelaHeaders[] } }).tabelas;
      const geral = (data as { geral?: IpcaGeralData }).geral;

      if (analitico?.filteredData) {
        setAnaliticoData(analitico.filteredData);
      }

      if (geral?.filteredData) {
        setGeralData(geral.filteredData);
      }

    }
  }, [data]);

  const toCompare = getUniqueValues<IpcaTabelaHeaders, "Capital">(
    analiticoData,
    "Capital"
  );

  useEffect(() => {
    const getNewTables = tempFiltred.map((val) => {
      return tables[0];
    });

    setTablesRender([...getNewTables]);
  }, [tempFiltred]);

  const handlePageChange = (direction: "prev" | "next") => {
    setAnimationClass("card-exit"); // Aplica a animação de saída
    setTimeout(() => {
      setPageCompare((prevPage) =>
        direction === "next"
          ? prevPage === tempFiltred.length - 1
            ? 0
            : prevPage + 1
          : prevPage === 0
          ? tempFiltred.length - 1
          : prevPage - 1
      );
      setAnimationClass("card-enter"); // Aplica a animação de entrada após a mudança
    }, 500); // Tempo suficiente para a animação de saída
  };

  return (
    <div className="pb-4">
      <SelectPrincipal
        options={toCompare}
        filters={tempFiltred}
        setFilters={setTempFiltred}
        initialValue={["Recife"]}
        noRecife={false}
      />

      <div className="flex justify-between items-center gap-2">
        <button
          className="border transition duration-500 hover:bg-slate-200 dark:hover:bg-[#0F253D] bg-white dark:bg-[#0C1A28] dark:border-gray-600 rounded-full w-10 h-10 flex items-center justify-center"
          onClick={() => handlePageChange("prev")}
        >
          <svg
            className={`h-4 w-4 text-gray-500 dark:text-gray-300 transition-transform duration-200 rotate-90`}
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
          {tempFiltred.map((toCompare: string, index) => {
            return cards.map(({ Component }, indexChid) => (
              <React.Suspense fallback={<div>Carregando...</div>} key={indexChid}>
                <div
                  className={`${
                    toCompare === tempFiltred[pageCompare]
                      ? animationClass
                      : "hidden"
                  } flex-1`}
                >
                  <Component
                    data={geralData}
                    year={year}
                    capital={tempFiltred[pageCompare]}
                    color={ColorPalette.default[index]}
                  />
                </div>
              </React.Suspense>
            ));
          })}
        </div>

        <button
          className="border transition duration-500 hover:bg-slate-200 dark:hover:bg-[#0F253D] bg-white dark:bg-[#0C1A28] dark:border-gray-600 rounded-full w-10 h-10 flex items-center justify-center"
          onClick={() => handlePageChange("next")}
        >
          <svg
            className={`h-4 w-4 text-gray-500 dark:text-gray-300 transition-transform duration-200 -rotate-90`}
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
          {tablesRender.map(({ Component }, index) => {

            return (
              <React.Suspense fallback={<div>Carregando...</div>} key={index}>
                <div
                  style={{ backgroundColor: ColorPalette.default[index] }}
                  className="shadow-md rounded-lg w-100 flex flex-col items-center"
                >
                  <Component
                    capital={[...tempFiltred][index]}
                    color={ColorPalette.default[index]}
                    data={analiticoData}
                    year={year}
                    monthRecent={monthRecent}
                  />
                </div>
              </React.Suspense>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analitico;
