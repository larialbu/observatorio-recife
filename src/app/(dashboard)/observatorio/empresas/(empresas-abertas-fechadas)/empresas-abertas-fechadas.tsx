import React, { useState, useEffect, useRef } from "react";

import SelectCompare from "@/components/@global/features/SelectCompare";
import SelectPrincipal from "@/components/@global/features/SelectPrincipal";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { geralAccFieldFunction, geralAccFunction } from "@/functions/process_data/observatorio/rais/demografia/geralFuncition";
import { getUniqueValues } from "@/utils/filters/@global/getUniqueValues";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import cards from "./@imports/cards";
import charts from "./@imports/charts";
import { rearrangeArray } from "@/functions/process_data/observatorio/porto/comparativo/charts/filteredPortoData";
import ErrorBoundary from "@/utils/loader/errorBoundary";


const ComparativoClasses = ({
  year,
  data,
  toCompare = getUniqueValues<any, "Município">(
    data['rawData']['ativas'],
    "Município"
  )
}: {
  year: string;
  toCompare?: any;
  data: any;
}) => {
  const [pageCompare, setPageCompare] = useState(0);
  const [tempFiltred, setTempFiltred] = useState([]);
  const [selectCompare, setSelectCompare] = useState('')
  const [tablesRender, setTablesRender] = useState([charts]);
  const [animationClass, setAnimationClass] = useState("card-enter");

  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));

  const [chartData, setChartData] = useState({})

  const sortableContainerRef = useRef<HTMLDivElement>(null);

  console.log('DAtaPAge->', data)
  // existe diferenca
  // console.log('ToCOmpare->', toCompare)
  // console.log('INATIVAS', getUniqueValues<any, "Município">(
  //   data['rawData']['inativas'],
  //   "Município"
  // ))

  const params = ['Natureza Jurídica', 'mes', 'Porte', 'Município']

  useEffect(() => {
    const dataFormat = (data: any) => {
      const dataMuni: { [key: string]: any } = {}

      toCompare.map((muni: string) => {
        const dataFiltred =  data?.filter((micro: any) => micro['Município'] === muni) || []
        if (!dataMuni[muni]) dataMuni[muni] = {}  


          dataMuni[muni] = geralAccFieldFunction(dataFiltred, params, 'Quantidade de Empresas')
      }) 

      return dataMuni
    }

    const dataMuni = {
      empresas: {
        ativas: dataFormat(data['empresas']['ativas']),
        inativas: dataFormat(data['empresas']['inativas'])
      },
      rawData: {
        ativas: dataFormat(data['rawData']['ativas']),
        inativas: dataFormat(data['rawData']['inativas'])
      }
    }

    // const dataMuni: { [key: string]: any } = {}

    //  toCompare.map((muni: string) => {
    //   const dataFiltred =  data['empresas']['ativas']?.filter((micro: any) => micro['Município'] === muni) || []
    //   if (!dataMuni[muni]) dataMuni[muni] = {}  


    //   dataMuni[muni] = geralAccFieldFunction(dataFiltred, params, 'Quantidade de Empresas')

    // }) 

    console.log('DATaMUNI', dataMuni)
    setChartData(dataMuni)
  }, [data])


  // useEffect(() => {
  //   const getNewTables = tempFiltred.map(() => charts) 

  //   setTablesRender([...getNewTables])

  //   console.log('[...getNewTables]', [...getNewTables])
  // }, [tempFiltred]);

  // const tempFiltredCard = tempFiltred.filter((municipio) => municipio !== selectCompare)

  // const handlePageChange = (direction: "prev" | "next") => {
  //   setAnimationClass("card-exit"); // Aplica a animação de saída
  //   setTimeout(() => {
  //     setPageCompare((prevPage) =>
  //       direction === "next"
  //         ? prevPage === tempFiltredCard.length - 1
  //           ? 0
  //           : prevPage + 1
  //         : prevPage === 0
  //         ? tempFiltredCard.length - 1
  //         : prevPage - 1
  //     );
  //     setAnimationClass("card-enter"); // Aplica a animação de entrada após a mudança
  //   }, 500); // Tempo suficiente para a animação de saída
  // };


  return (
    <div>
      {/* <SelectPrincipal
        options={toCompare}
        initialValue={['Recife']}
        selectMax={2}
        noRecife={false}
        filters={tempFiltred}
        setFilters={setTempFiltred}
        label="Compare Municípios"
        placeholder="Digite para buscar um município"
        notFoundMessage="Nenhum município encontrado"
      /> */}

      {/* <div className="mb-2">
        <SelectCompare
          options={toCompare}
          initialValue={'Recife'}
          filters={selectCompare}
          setFilters={setSelectCompare}
          label="Cards comparando com:"
        />
      </div> */}

      {/* <div className="flex justify-between items-center gap-2">
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
      </div> */}

      {/* <div className="flex items-center justify-center mb-6 gap-2">
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
      </div> */}

      <div className="flex flex-col gap-6">

      {/* <SortableDiv chartOrder={chartOrder} setChartOrder={setChartOrder} sortableContainerRef={sortableContainerRef} style="charts-items-wrapper">
        {tablesRender?.[0]?.slice(0, 1).map(({ Component }, index) => (
            <div
              key={index}
              className="chart-content-wrapper col-span-full"
            >
              <React.Suspense fallback={<div>Carregando...</div>}>
                <Component
                  toCompare={[...tempFiltred]}
                  data={chartData}
                  year={year}
                />
              </React.Suspense>
            </div>
        ))}
      </SortableDiv> */}

      {/* <SortableDiv chartOrder={chartOrder} setChartOrder={setChartOrder} sortableContainerRef={sortableContainerRef} style="charts-items-wrapper 2xl:!grid-cols-4">
          {(tablesRender.length > 1 ? (rearrangeArray(tablesRender)?.slice(2) || []) : (tablesRender[0]?.slice(1) || [])).map(({ Component }, index) => {
              // isso é para escolher qual porto ele vai pegar no tempfitred
              const virtuaIndex = tablesRender.length > 1 ? (index % 2 === 0 ? 0 : 1) : 0

              return (
                <>
                  <div className={`hidden 2xl:block ${index !== 4 && "!hidden"}`}></div>

                  <div key={index} className={`chart-content-wrapper`}>
                    <React.Suspense fallback={<div>Carregando...</div>}>
                      <ErrorBoundary>
                        <Component 
                          color={ColorPalette.default[virtuaIndex]} 
                          municipio={[...tempFiltred][virtuaIndex]} 
                          data={chartData?.[[...tempFiltred][virtuaIndex]]?.['municipio']} />
                      </ErrorBoundary>                      
                    </React.Suspense>
                  </div>              
                </>        
            )})}
        </SortableDiv> */}
      </div>
    </div>
  );
};

export default ComparativoClasses;
