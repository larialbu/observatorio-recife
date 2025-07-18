import React, { useState, useEffect, useRef } from "react";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import cards from "./@imports/cards";
import charts from "./@imports/charts";
import SelectPrincipal from "@/components/@global/features/SelectPrincipal";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { getUniqueValues } from "@/utils/filters/@global/getUniqueValues";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import SelectCompare from "@/components/@global/features/SelectCompare";
import { getMunicipiosMonthData } from "@/functions/process_data/observatorio/micro-caged/comparativo-med/getMonthsValues";
import { getSmFiltred } from "@/functions/process_data/observatorio/micro-caged/getSmFiltred";

const ComparativoMed = ({
  year,
  data,
  toCompare = getUniqueValues<any, "município">(
    data.current,
    "município"
  )
}: {
  year: string;
  toCompare?: any;
  data: any;
}) => {
  const [pageCompare, setPageCompare] = useState(0);
  const [tempFiltred, setTempFiltred] = useState([]);
  const [selectCompare, setSelectCompare] = useState('')
  const [animationClass, setAnimationClass] = useState("card-enter");

  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));
  const [chartData, setChartData] = useState({})

  const sortableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dataPast = getMunicipiosMonthData(getSmFiltred(data['past']), toCompare) || {}
    const dataCurrent = getMunicipiosMonthData(getSmFiltred(data['current']), toCompare)

    setChartData({ current: dataCurrent, past: dataPast })
  }, [data])


  const tempFiltredCard = tempFiltred.filter((municipio) => municipio !== selectCompare)

  const handlePageChange = (direction: "prev" | "next") => {
    setAnimationClass("card-exit"); // Aplica a animação de saída
    setTimeout(() => {
      setPageCompare((prevPage) =>
        direction === "next"
          ? prevPage === tempFiltredCard.length - 1
            ? 0
            : prevPage + 1
          : prevPage === 0
          ? tempFiltredCard.length - 1
          : prevPage - 1
      );
      setAnimationClass("card-enter"); // Aplica a animação de entrada após a mudança
    }, 500); // Tempo suficiente para a animação de saída
  };

  return (
    <div>
      <SelectPrincipal
        options={toCompare}
        initialValue={['Recife-PE']}
        noRecife={false}
        filters={tempFiltred}
        setFilters={setTempFiltred}
        label="Compare Municípios"
        placeholder="Digite para buscar um município"
        notFoundMessage="Nenhum município encontrado"
      />

      <div className="mb-2">
        <SelectCompare
          options={toCompare}
          initialValue={'Recife-PE'}
          filters={selectCompare}
          setFilters={setSelectCompare}
          label="Cards comparando com:"
        />
      </div>

      <div className="flex justify-between items-center gap-2">
        {tempFiltredCard.length >= 1 ? (
          <>
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
              {tempFiltredCard.map((toCompare: string) => {
                return cards.map(({ Component }, index) => (
                  <React.Suspense fallback={<div>Carregando...</div>} key={index}>
                    <div
                      className={`${
                        toCompare === tempFiltredCard[pageCompare]
                          ? animationClass
                          : "hidden"
                      } flex-1`}
                    >
                      <Component
                        compare={selectCompare}
                        toCompare={toCompare}
                        data={chartData}
                        year={year}
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
          </>
        ) : (
          <p className="text-center w-full text-gray-700 dark:text-gray-300">
            Selecione um município para as informações serem comparadas
          </p>
        )}
      </div>

      <div className="flex items-center justify-center mb-6 gap-2">
        {tempFiltredCard.map((_, i) => {
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
       
      <SortableDiv chartOrder={chartOrder} setChartOrder={setChartOrder} sortableContainerRef={sortableContainerRef} style="charts-items-wrapper">
        {chartOrder.map((index) => {
          const { Component, col } = charts[index];
          return (
            <div
              key={index}
              className={`chart-content-wrapper ${col === 'full' && 'col-span-full'}`}
            >
              <React.Suspense fallback={<GraphSkeleton />}>
                <Component
                  data={chartData}
                  toCompare={[...tempFiltred]}
                />
              </React.Suspense>
            </div>
          );
        })}
      </SortableDiv>
      </div>
    </div>
  );
};

export default ComparativoMed;
