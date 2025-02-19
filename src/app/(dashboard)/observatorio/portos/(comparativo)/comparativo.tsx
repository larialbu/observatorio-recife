import React, { useState, useEffect, useRef } from "react";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import cards from "./@imports/cards";
import charts from "./@imports/charts";
import tables from "./@imports/tables";
import SelectPrincipal from "@/components/@global/features/SelectPrincipal";
import { SortableDiv } from "@/components/@global/features/SortableDiv";

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

  const [portosDataFiltred, setPortosDataFiltred] = useState([])

  // REF do container e REF da instância do Sortable
  const sortableContainerRef = useRef<HTMLDivElement>(null);
  const sortableContainerTableRef = useRef<HTMLDivElement>(null);

// console.log('COMPARATIVO DATAS', data, toCompare)
// console.log('UNIQUER VALUES',  getUniqueValues<processedAtracacaoData, "Porto Atracação">(
//   data.atracacao,
//   "Porto Atracação"
// ),)

const attTempFiltred = ['Recife', ...tempFiltred]

const getFiltredData = (rawData: any, portos: any) => {
  console.log('RAWDATA POROTOS', rawData, portos)
  if (!rawData || !rawData['atracacao'] || !rawData['carga']) {
    return []
  }

  // Filtra atracações pelos portos selecionados
  const filtredAtracacao = rawData['atracacao'].filter((item: any) =>
    portos.includes(item['Porto Atracação']),
  )

  // // Obtém os CDTUPs únicos das atracações filtradas
  // const uniqueCDTUPs = [
  //   ...new Set(filtredAtracacao.map((item: any) => item.CDTUP)),
  // ]

  // // Filtra as cargas que tenham Origem ou Destino nos CDTUPs das atracações filtradas
  // const filtredCarga = rawData['carga'].filter(
  //   (item: any) =>
  //     uniqueCDTUPs.includes(item.Origem) ||
  //     uniqueCDTUPs.includes(item.Destino),
  // )

  const atracacaoIds = new Set(filtredAtracacao.map((atracacao: any) => atracacao.IDAtracacao));

  const filtredCarga = rawData['carga'].filter((item: any) => atracacaoIds.has(item.IDAtracacao));


  // console.log('QUANTIDADE DE CARGAS QUE FORAM FILTRADOS', filtredCarga)

  // Organiza os dados por porto
  const dadosPorPorto = portos.map((porto: any) => {
    const atracacoes = filtredAtracacao.filter(
      (atracacao: any) => atracacao['Porto Atracação'] === porto,
    )

    // Filtra cargas associadas às atracações desse porto

    // a mudanca tem q ser aki nos não poemos fazer essa correlçaão pois os alguns tem ids diferentes atracacao.IDAtracacao === carga.IDAtracacao,, por isso precisamos que a correlação tem q ser com o o codigo CDTUP caso o ocdigo do porto está na origem ou destino da carga, a carga possui a este porto, 


    const cargas = filtredCarga.filter((carga: any) =>
      atracacoes.some(
        (atracacao: any) => atracacao.IDAtracacao === carga.IDAtracacao,
      ),
    )

    return {
      porto,
      atracacao: atracacoes,
      cargas,
    }
  })

  return dadosPorPorto
}

useEffect(() => {
  const portosDataFIltred = getFiltredData(rawData, attTempFiltred)
  console.log('CAHCRRO', portosDataFIltred)

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
                //  console.log('IIINDEEEEXXXXX', index)
                //  console.log('PORTOS DATA FILTR', portosDataFiltred)
                //  console.log('COISA POR INDEX', ["Recife", ...tempFiltred][index], ["Recife", ...tempFiltred])
                //  console.log('DATA ALGUAA', { ...data, atracacao: portosDataFiltred.find((obj: any) => obj.porto == ["Recife", ...tempFiltred][index])?.['atracacao'] || [], carga: portosDataFiltred.find((obj: any) => obj.porto == ["Recife", ...tempFiltred][index])?.['cargas'] || [], rawData: {} })
                 
                  return (
                  // <div key={index}></div>
                  <React.Suspense fallback={<div>Loading...</div>} key={index}>
                    <div
                      className={`${
                        toCompare === attTempFiltred[pageCompare]
                          ? animationClass
                          : "hidden"
                      } flex-1`}
                    >
                      {/* <Component
                        toCompare={toCompare}
                        data={data}
                        year={year}
                        color={ColorPalette.default[index]}
                      /> */}
                      {/* data={{ ...data, atracacao: portosDataFiltred.find((obj: any) => obj.porto == ["Recife", ...tempFiltred][index])?.['atracacao'] || [], carga: portosDataFiltred.find((obj: any) => obj.porto == ["Recife", ...tempFiltred][index])?.['cargas'] || [], rawData: {} }} */}
                      <Component data={{ ...data, atracacao: portosDataFiltred.find((obj: any) => obj.porto == ["Recife", ...tempFiltred][index])?.['atracacao'] || [], carga: portosDataFiltred.find((obj: any) => obj.porto == ["Recife", ...tempFiltred][index])?.['cargas'] || [], rawData: {} }} cards={cards.slice(1)} year={year} ColorPalette={ColorPalette.default} />
                    </div>
                  </React.Suspense>
                )});
              })}
            </div>

            {/* <div className="flex flex-wrap gap-4 justify-center mb-8">
        {cards.slice(0, 1).map(({ Component }, index) => (
          <React.Suspense fallback={<div>Loading...</div>} key={index}>
            <Component data={data} cards={cards.slice(1)} year={year} ColorPalette={ColorPalette.default} />
          </React.Suspense>
        ))}
      </div> */}

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
       
      <SortableDiv chartOrder={tableOrder} setChartOrder={setTableOrder} sortableContainerRef={sortableContainerTableRef} style="charts-items-wrapper">
          {/* {tablesRender.map(({ Component }, index) => { */}
          {tablesRender.map((arrChart, index) => {
            return arrChart.map(({ Component }) => {
              return (
              <div
                key={index}
                className={`chart-content-wrapper`}
                // className="bg-white shadow-md rounded-lg w-100 flex flex-col items-center"
              >
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Component
                    porto={["Recife", ...tempFiltred][index]}
                    // rawData={rawData}
                    color={ColorPalette.default[index]}
                    data={{ ...data, atracacao: portosDataFiltred.find((obj: any) => obj.porto == ["Recife", ...tempFiltred][index])?.['atracacao'] || [], carga: portosDataFiltred.find((obj: any) => obj.porto == ["Recife", ...tempFiltred][index])?.['cargas'] || [], rawData: {} }}
                    // data={{ ...data, atracacao: atracacaoFiltred, carga: cargaFiltred, rawData: {} }}
                    // data={data}
                    year={year}
                  />
                </React.Suspense>
              </div>
            )})})}
        </SortableDiv>

         {/* <SortableDiv chartOrder={chartOrder} setChartOrder={setChartOrder} sortableContainerRef={sortableContainerRef} style="charts-items-wrapper">
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

        {/* <SortableDiv chartOrder={tableOrder} setChartOrder={setTableOrder} sortableContainerRef={sortableContainerTableRef} style="charts-items-wrapper">
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
