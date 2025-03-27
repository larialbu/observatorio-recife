import React, { useState, useEffect, useRef } from "react";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import cards from "./@imports/cards";
import charts from "./@imports/charts";
import tables from "./@imports/tables";
import SelectPrincipal from "@/components/@global/features/SelectPrincipal";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import { getUniqueValues } from "@/utils/filters/@global/getUniqueValues";
import { processedAtracacaoData } from "@/@types/observatorio/porto/processedAtracacaoData";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import { getFiltredData, rearrangeArray } from "@/functions/process_data/observatorio/porto/comparativo/charts/filterdPortoData";

// AEROPORTO NOME

const Comparativo = ({
  year,
  data,
  toCompare = getUniqueValues<processedAtracacaoData, "Porto Atracação">(
    data.atracacao,
    "Porto Atracação"
  ),
  rawData,
  months,
}: {
  year: string;
  toCompare?: any;
  data: any;
  months: number;
  rawData: any
}) => {

  const [pageCompare, setPageCompare] = useState(0);
  
  const [tempFiltred, setTempFiltred] = useState([]);
  const [tablesRender, setTablesRender] = useState([charts]);

  const [animationClass, setAnimationClass] = useState("card-enter");

  const [tableOrder, setTableOrder] = useState(tables.map((_, index) => index));

  const [portosDataFiltred, setPortosDataFiltred] = useState([])

  const sortableContainerTableRef = useRef<HTMLDivElement>(null);

const attTempFiltred = ['Recife', ...tempFiltred]

useEffect(() => {
  const portosDataFIltred = getFiltredData(rawData, attTempFiltred)

    const getNewTables = tempFiltred.map((val) => {
      return [...charts];
    });

    setPortosDataFiltred(portosDataFIltred)
    setTablesRender([[...charts], ...getNewTables]);
  }, [tempFiltred, rawData]);

  const handlePageChange = (direction: "prev" | "next") => {
    setAnimationClass("card-exit"); // Aplica a animação de saída
    setTimeout(() => {
      setPageCompare((prevPage) =>
        direction === "next"
          ? prevPage === attTempFiltred.length - 1
            ? 0
            : prevPage + 1
          : prevPage === 0
          ? attTempFiltred.length - 1
          : prevPage - 1
      );
      setAnimationClass("card-enter"); // Aplica a animação de entrada após a mudança
    }, 500); // Tempo suficiente para a animação de saída
  };

  return (
    <div>
      <SelectPrincipal
        options={toCompare}
        filters={tempFiltred}
        setFilters={setTempFiltred}
        label="Compare Portos"
        placeholder="Digite para buscar um porto"
        notFoundMessage="Nenhum porto encontrado"
        unique
      />

      <div className="flex justify-between items-center gap-2">
        {attTempFiltred.length >= 1 ? (
          <>
            <button
              className="border transition duration-500 hover:bg-slate-200 bg-white rounded-full w-10 h-10 flex items-center justify-center"
              onClick={() => handlePageChange("prev")}
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
              {attTempFiltred.map((toCompare: string, index: number) => {
                return cards.slice(0, 1).map(({ Component }) => {
                 
                  return (
                  <React.Suspense fallback={<div>Carregando...</div>} key={index}>
                    <div
                      className={`${
                        toCompare === attTempFiltred[pageCompare]
                          ? animationClass
                          : "hidden"
                      } flex-1`}
                    >
                      <ErrorBoundary>
                        <Component data={{ 
                          ...data, atracacao: portosDataFiltred.find((obj: any) => obj.porto == ["Recife", ...tempFiltred][index])?.['atracacao'] || [], 
                          carga: portosDataFiltred.find((obj: any) => obj.porto == ["Recife", ...tempFiltred][index])?.['cargas'] || [], rawData: {} }} 
                          cards={cards.slice(1)} year={year} ColorPalette={ColorPalette.default} />
                      </ErrorBoundary>
                    </div>
                  </React.Suspense>
                )});
              })}
            </div>

            <button
              className="border transition duration-500 hover:bg-slate-200 bg-white rounded-full w-10 h-10 flex items-center justify-center"
              onClick={() => handlePageChange("next")}
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
          </>
        ) : (
          <p className="text-center w-full text-gray-700">
            Selecione um aeroporto para as informações serem comparadas
          </p>
        )}
      </div>

      <div className="flex items-center justify-center mb-6 gap-2">
        {attTempFiltred.map((_, i) => {
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
       
      <SortableDiv chartOrder={tableOrder} setChartOrder={setTableOrder} sortableContainerRef={sortableContainerTableRef} style="charts-items-wrapper 2xl:!grid-cols-2">
        {tablesRender.map((arrChart, index) => {
          
        return arrChart.slice(0, 1).map(({ Component, col }) => {
            return (
              <div key={index} className={`chart-content-wrapper ${col === 'full' && tablesRender.length === 1 && 'col-span-full'}`}>
              {/* <div key={index} className={`chart-content-wrapper`}> */}
              <React.Suspense fallback={<div>Carregando...</div>}>
                <Component
                  porto={["Recife", ...tempFiltred][index]}
                  color={ColorPalette.default[index]}
                  data={{ ...data, atracacao: portosDataFiltred.find((obj: any) => obj.porto == ["Recife", ...tempFiltred][index])?.['atracacao'] || [], carga: portosDataFiltred.find((obj: any) => obj.porto == ["Recife", ...tempFiltred][index])?.['cargas'] || [], rawData: {} }}
                  year={year}
                />
              </React.Suspense>
            </div>
          )})})}
      </SortableDiv> 

      <SortableDiv chartOrder={tableOrder} setChartOrder={setTableOrder} sortableContainerRef={sortableContainerTableRef} style="charts-items-wrapper 2xl:!grid-cols-4">
          {(tablesRender.length > 1 ? rearrangeArray(tablesRender).slice(2) : tablesRender[0].slice(1)).map(({ Component, col }, index) => {
              // isso é para escolher qual porto ele vai pegar no tempfitred
              const virtuaIndex = tablesRender.length > 1 ? (index % 2 === 0 ? 0 : 1) : 0
            
              return (
                <div key={index} className={`chart-content-wrapper`}>
                <React.Suspense fallback={<div>Carregando...</div>}>
                  <Component
                    porto={["Recife", ...tempFiltred][virtuaIndex]}
                    color={ColorPalette.default[virtuaIndex]}
                    data={{ ...data, atracacao: portosDataFiltred.find((obj: any) => obj.porto == ["Recife", ...tempFiltred][virtuaIndex])?.['atracacao'] || [], carga: portosDataFiltred.find((obj: any) => obj.porto == ["Recife", ...tempFiltred][virtuaIndex])?.['cargas'] || [], rawData: {} }}
                    year={year}
                  />
                </React.Suspense>
              </div>
            )})}
        </SortableDiv>
      </div>
    </div>
  );
};

export default Comparativo;
