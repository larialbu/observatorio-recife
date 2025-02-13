import React, { useState, useEffect, useRef } from "react";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import cards from "./@imports/cards";
import charts from "./@imports/charts";
import tables from "./@imports/tables";
import SelectPrincipal from "@/components/@global/features/SelectPrincipal";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { getUniqueValues } from "@/utils/filters/@global/getUniqueValues";
import { ProcessedData } from "@/@types/observatorio/aeroporto/processedData";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import { processedAtracacaoData } from "@/@types/observatorio/porto/processedAtracacaoData";

// AEROPORTO NOME

const Comparativo = ({
  year,
  data,
  // toCompare = getUniqueValues<processedAtracacaoData, "Porto Atracação">(
  //   data.atracacao,
  //   "Porto Atracação"
  // ),
  rawData,
  toCompare,
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
  // const [tablesRender, setTablesRender] = useState(tables);
  const [tablesRender, setTablesRender] = useState([charts]);
  // const [chartsRender, setChartsRender] = useState
  const [animationClass, setAnimationClass] = useState("card-enter");

  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));
  const [tableOrder, setTableOrder] = useState(tables.map((_, index) => index));

  const [atracacaoFiltred, setAtracacaoFiltred] = useState([])
  const [cargaFiltred, setCargaFiltred] = useState([])

  // REF do container e REF da instância do Sortable
  const sortableContainerRef = useRef<HTMLDivElement>(null);
  const sortableContainerTableRef = useRef<HTMLDivElement>(null);

// console.log('COMPARATIVO DATAS', data, toCompare)
// console.log('UNIQUER VALUES',  getUniqueValues<processedAtracacaoData, "Porto Atracação">(
//   data.atracacao,
//   "Porto Atracação"
// ),)


  const getFiltredData = (portos: string[]) => {
    // const filtredAtracacao = [[atracacao com o mesmo porto], [atracacao com o mesmo porto]]
    // const filtredCarga = [[cargas com o mesmo cod], [cargas com o mesmo cod]]

    // talvez guardar por porto { porto: recife, atracacao, cargas }

    // eu quero passar os coisas 

    if (!rawData || !rawData['atracacao'] || !rawData['carga']) {
      return { atracacaoFiltred: [], cargaFiltred: [] };  
    }

    const filtredAtracacao = rawData['atracacao'].filter((item: any) => {
      if (portos.includes(item['Porto Atracação'])) {
        return item
      }
    }) || []

    const uniqueCDTUPs = getUniqueValues<processedAtracacaoData, "CDTUP">(
      filtredAtracacao,
      "CDTUP"
    )

    const filtredCarga =  rawData['carga'].filter((item: any) => {
      if (uniqueCDTUPs.includes(item.Origem) || uniqueCDTUPs.includes(item.Destino)) {
        return item
      }
    }) || []

    return { atracacaoFiltred: filtredAtracacao, cargaFiltred: filtredCarga}
  }

  useEffect(() => {
  const { atracacaoFiltred, cargaFiltred } = getFiltredData(['Recife', ...tempFiltred])

  // console.log('FILTREDF A ', atracacaoFiltred, cargaFiltred )

    const getNewTables = tempFiltred.map((val) => {
      return [{
        Component: React.lazy(
          () =>
            import(
              // "@/components/@build/observatorio/tables/aeroporto/comparativo/AeroportoInfo"
              "@/components/@build/observatorio/charts/porto/comparativo/OperacaoCargasAno"
            )
        ),
      }, 
       {
          Component: React.lazy(
            () =>
              import(
                "@/components/@build/observatorio/charts/porto/comparativo/PaisesExportados"
              )
          ),
        },
        {
          Component: React.lazy(
            () =>
              import(
                "@/components/@build/observatorio/charts/porto/comparativo/PaisesImportados"
              )
          ),
        },
        {
          Component: React.lazy(
            () =>
              import(
                "@/components/@build/observatorio/charts/porto/comparativo/PrincipaisProdutos"
              )
          ),
        },
    ];
    });

    setAtracacaoFiltred(atracacaoFiltred)
    setCargaFiltred(cargaFiltred)
    setTablesRender([[...charts], ...getNewTables]);
  }, [tempFiltred, rawData]);

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
        {tempFiltred.length >= 1 ? (
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
              {tempFiltred.map((toCompare: string) => {
                return cards.map(({ Component }, index) => (
                  <div></div>
                  // <React.Suspense fallback={<div>Loading...</div>} key={index}>
                  //   <div
                  //     className={`${
                  //       toCompare === tempFiltred[pageCompare]
                  //         ? animationClass
                  //         : "hidden"
                  //     } flex-1`}
                  //   >
                  //     <Component
                  //       toCompare={toCompare}
                  //       data={data}
                  //       year={year}
                  //       color={ColorPalette.default[index]}
                  //     />
                  //   </div>
                  // </React.Suspense>
                ));
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
       
      <SortableDiv chartOrder={tableOrder} setChartOrder={setTableOrder} sortableContainerRef={sortableContainerTableRef} style="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {/* {tablesRender.map(({ Component }, index) => { */}
          {tablesRender.map((arrChart, index) => {
            return arrChart.map(({ Component }) => {
              return (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg w-100 flex flex-col items-center"
              >
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Component
                    porto={["Recife", ...tempFiltred][index]}
                    // rawData={rawData}
                    color={ColorPalette.default[index]}
                    data={{ ...data, atracacao: atracacaoFiltred, carga: cargaFiltred }}
                    // data={data}
                    year={year}
                  />
                </React.Suspense>
              </div>
            )})})}
        </SortableDiv>

         {/* <SortableDiv chartOrder={chartOrder} setChartOrder={setChartOrder} sortableContainerRef={sortableContainerRef} style="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
            {chartOrder.map(( index) => {
            const { Component } = charts[index];
            return (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-4 w-100 flex flex-col items-center"
                >
                  <React.Suspense fallback={<GraphSkeleton />}>
                    <Component
                      data={data}
                      toCompare={["Recife", ...tempFiltred]}
                      months={months}
                    />
                  </React.Suspense>
                </div>
              )})}
        </SortableDiv> */}

        {/* <SortableDiv chartOrder={tableOrder} setChartOrder={setTableOrder} sortableContainerRef={sortableContainerTableRef} style="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {tablesRender.map(({ Component }, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg w-100 flex flex-col items-center"
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
        </SortableDiv> */}
      </div>
    </div>
  );
};

export default Comparativo;
