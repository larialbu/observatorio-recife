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
import { CardsCarousel } from "@/components/@global/features/CardsCarousel";

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

  const absoluteDivRef = useRef<HTMLDivElement>(null);

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
                    <Component local={attTempFiltred[pageCompare]} data={{ 
                      ...data, atracacao: portosDataFiltred.find((obj: any) => obj.porto == ["Recife", ...tempFiltred][index])?.['atracacao'] || [], 
                      carga: portosDataFiltred.find((obj: any) => obj.porto == ["Recife", ...tempFiltred][index])?.['cargas'] || [], rawData: {} }} 
                      cards={cards.slice(1)} year={year} ColorPalette={ColorPalette.default} />
                  </ErrorBoundary>
                  </div>
                </React.Suspense>
                      )});
                    })}
       </CardsCarousel>

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
                <>
                  <div className={`hidden 2xl:block ${index !== 4 && "!hidden"}`}></div>

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
                </>        
            )})}
        </SortableDiv>
      </div>
    </div>
  );
};

export default Comparativo;


 