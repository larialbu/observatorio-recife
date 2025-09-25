import React, { useState, useEffect, useRef } from "react";

import { PortoGeralData, PortoOperacaoData } from "@/@types/observatorio/@data/portoData";
import { PortoAtracacaoHeaders, PortoCargaHeaders } from "@/@types/observatorio/@fetch/porto";
import { ChartBuild } from "@/@types/observatorio/shared";
import { CardsCarousel } from "@/components/@global/features/CardsCarousel";
import SelectPrincipal from "@/components/@global/features/SelectPrincipal";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import { rearrangeArray } from "@/functions/process_data/observatorio/porto/comparativo/charts/filteredPortoData";
import { getUniqueValues } from "@/utils/filters/@global/getUniqueValues";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import cards from "./@imports/cards";
import charts from "./@imports/charts";
import tables from "./@imports/tables";
import { getChartDataModelComparative } from "@/functions/process_data/observatorio/porto/getChartModel";

const Comparativo = ({
  year,
  data,
  toCompare = getUniqueValues<PortoAtracacaoHeaders, "Porto Atracação">(
    data.rawData.accumulated,
    "Porto Atracação"
  ),
  months
}: ChartBuild<PortoGeralData>) => {

  const [pageCompare, setPageCompare] = useState(0);
  
  const [tempFiltred, setTempFiltered] = useState<string[]>([]);
  const [tablesRender, setTablesRender] = useState([charts]);

  const [tableOrder, setTableOrder] = useState(tables.map((_, index) => index));

  const [portosDataFiltered, setPortosDataFiltered] = useState<{ 
    [key: string]: {
      [key: string]: {
        [key: string]: number | {
            [key: string]: number;
        };
      };
    }
  }>({});

  const sortableContainerTableRef = useRef<HTMLDivElement>(null);

const attTempFiltred = ['Recife', ...tempFiltred]

useEffect(() => {
    const filtredAtracacao = data['rawData']['accumulated'].filter((item: any) =>
      attTempFiltred.includes(item['Porto Atracação']),
    )

    const params = ['nomeMercadoria', 'País Destino', 'País Origem', 'Mes', 'Ação']

    const dataAccumulatedField = getChartDataModelComparative(filtredAtracacao, params, 'VLPesoCargaBruta')

    const getNewTables = tempFiltred.map((val) => {
      return [...charts];
    });


    setPortosDataFiltered(dataAccumulatedField)
    setTablesRender([[...charts], ...getNewTables]);
  }, [tempFiltred, data]);

  const absoluteDivRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <SelectPrincipal
        options={toCompare}
        filters={tempFiltred}
        setFilters={setTempFiltered}
        label="Compare Portos"
        placeholder="Digite para buscar um porto"
        notFoundMessage="Nenhum porto encontrado"
        unique
      />

      <CardsCarousel absoluteDivRef={absoluteDivRef} dataPassed={attTempFiltred} pageCompare={pageCompare} setPageCompare={setPageCompare} textDefault="Selecione um aeroporto para as informações serem comparadas" >
        {attTempFiltred.map((toCompare: string, index: number) => {
          return cards.slice(0, 1).map(({ Component }) => {
                      
            return (
              <React.Suspense fallback={<div>Carregando...</div>} key={index}>
                <div
                 ref={absoluteDivRef} 
                 className={`${
                    toCompare === attTempFiltred[pageCompare]
                     ? ''
                     : 'translate-x-[100%]'
                    } flex-1 absolute`}
                 >
                 <ErrorBoundary>
                    <Component local={attTempFiltred[pageCompare]} 
                      data={{ ...data, accumulated: (portosDataFiltered?.[["Recife", ...tempFiltred]?.[index]] || {}) } as PortoGeralData & PortoOperacaoData[] }
                      cards={cards.slice(1)} year={year ?? "2024"} color={ColorPalette.default} />
                  </ErrorBoundary>
                  </div>
                </React.Suspense>
                      )});
                    })}
       </CardsCarousel>

      <div className="flex flex-col gap-6">
       
      <SortableDiv chartOrder={tableOrder} setChartOrder={setTableOrder} sortableContainerRef={sortableContainerTableRef} style="charts-items-wrapper 2xl:!grid-cols-2">
        {tablesRender.map((arrChart, index: number) => {

        return arrChart.slice(0, 1).map(({ Component, col }) => {
            return (
              <div key={index} className={`chart-content-wrapper ${col === 'full' && tablesRender.length === 1 && 'col-span-full'}`}>
              <React.Suspense fallback={<div>Carregando...</div>}>
                <Component
                  porto={["Recife", ...tempFiltred][index]}
                  color={ColorPalette.default[index]}
                  data={{ ...data, accumulated: portosDataFiltered?.[["Recife", ...tempFiltred][index]] || {} } }
                  year={year}
                  months={months}
                />
              </React.Suspense>
            </div>
          )})})}
      </SortableDiv> 

      <SortableDiv chartOrder={tableOrder} setChartOrder={setTableOrder} sortableContainerRef={sortableContainerTableRef} style="charts-items-wrapper 2xl:!grid-cols-4">
          {(tablesRender.length > 1 ? rearrangeArray(tablesRender).slice(2) : tablesRender[0].slice(1)).map(({ Component }, index) => {
              // isso é para escolher qual porto ele vai pegar no tempfitred
              const virtuaIndex: number = tablesRender.length > 1 ? (index % 2 === 0 ? 0 : 1) : 0

              const portoKey = ["Recife", ...tempFiltred][virtuaIndex] as string

              return (
                <>
                  <div className={`hidden 2xl:block ${index !== 4 && "!hidden"}`}></div>

                  <div key={index} className={`chart-content-wrapper`}>
                    <React.Suspense fallback={<div>Carregando...</div>}>
                      <Component
                        porto={["Recife", ...tempFiltred][virtuaIndex]}
                        color={ColorPalette.default[virtuaIndex]}
                        data={{ ...data, accumulated: portosDataFiltered?.[portoKey] || {} } }
                        year={year}
                      />
                    </React.Suspense>
                  </div>              
                </>        
            )})}
        </SortableDiv>
      </div>
    </div>
  );
};

export default Comparativo;


 
