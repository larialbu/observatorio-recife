import React, { useState, useEffect, useRef } from "react";

import SelectCompare from "@/components/@global/features/SelectCompare";
import SelectPrincipal from "@/components/@global/features/SelectPrincipal";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import { getUniqueValues } from "@/utils/filters/@global/getUniqueValues";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import cards from "./@imports/cards";
import charts from "./@imports/charts";
import tables from "./@imports/tables";
import ErrorBoundary from "@/utils/loader/errorBoundary";


const CapagGeral = ({
  year,
  data,
  toCompare = getUniqueValues<any, "Município">(
    data?.['current'] || [],
    "Município"
  )
}: {
  year: string;
  toCompare?: any;
  data: any;
}) => {
  const [tempFiltred, setTempFiltred] = useState<string[]>([]);
  const [selectCompare, setSelectCompare] = useState('')
  const [tablesRender, setTablesRender] = useState([tables]);
  const [chartsRender, setChartsRender] = useState([...charts]);

  const [tableOrder, setTableOrder] = useState(tables.map((_, index) => index));
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));

  const [chartData, setChartData] = useState<any>({})

  const sortableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChartData(data)
  }, [data])


  useEffect(() => {
    const getNewTables = tempFiltred.map(() => tables) 
    const getNewCards= tempFiltred.map(() => cards) 

    setTablesRender([...getNewTables])

  }, [tempFiltred]);

  return (
    <div>
      <SelectPrincipal
        options={toCompare}
        initialValue={['Recife - PE']}
        selectMax={2}
        noRecife={false}
        filters={tempFiltred}
        setFilters={setTempFiltred}
        label="Compare Municípios"
        placeholder="Digite para buscar um município"
        notFoundMessage="Nenhum município encontrado"
      />

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {tempFiltred.map((filter, index) => {
          
          const dataToPass = chartData['current'].filter((data: any) => data['Município'] === filter)

          return cards.map(({ Component }) => { 
            return (
                <React.Suspense fallback={<div>Carregando...</div>} key={index}>
                  <Component data={dataToPass} year={year} color={ColorPalette.default[index]} />
                </React.Suspense>
              )
            })})}
      </div>

      <div className="flex flex-col gap-6">

      <SortableDiv chartOrder={tableOrder} setChartOrder={setTableOrder} sortableContainerRef={sortableContainerRef} style="charts-items-wrapper 2xl:!grid-cols-2">
        {tablesRender.map((arrChart, index) => {

        return arrChart.map(({ Component, col }) => {
            const virtuaIndex = tablesRender.length > 1 ? (index % 2 === 0 ? 0 : 1) : 0

            const chartDataEmpresas = chartData?.['current'] || []

            const dataToPass = [chartDataEmpresas?.find((data: any) => data['Município'] === [...tempFiltred][virtuaIndex])] 

            return (
              <div className={`w-full ${tablesRender.length === 1 && col}`} key={index}>
                <div className="w-full ">
                  <p className="font-bold text-[26px] text-[#808080]">{[...tempFiltred][virtuaIndex]}</p>
                </div>
                <div key={index} className={`chart-content-wrapper !p-0 `}>
                  <React.Suspense fallback={<div>Carregando...</div>}>
                    <Component
                      data={dataToPass}
                      year={year}
                    />
                  </React.Suspense>
                </div>
              </div>
          )})})}
      </SortableDiv> 

      <SortableDiv chartOrder={chartOrder} setChartOrder={setChartOrder} sortableContainerRef={sortableContainerRef} style="charts-items-wrapper ">
          {chartsRender.map(({ Component, col }: any , index) => {
              // isso é para escolher qual porto ele vai pegar no tempfitred
              const virtuaIndex = chartsRender.length > 1 ? (index % 2 === 0 ? 0 : 1) : 0

              const chartDataCapag = chartData?.['capag'] || []

              const dataToPass = chartDataCapag.filter((data: any) => tempFiltred.includes(data['Município']))

              return (
                <>
                {/* não lembro o motivo disso  */}
                  {/* <div className={`hidden 2xl:block ${index !== 4 && "!hidden"} ${col}`}></div> */}
                  <div key={index} className={`chart-content-wrapper ${col}`}>
                    <React.Suspense fallback={<div>Carregando...</div>}>
                      <ErrorBoundary>
                        <Component 
                          color={ColorPalette.default[virtuaIndex]} 
                          data={dataToPass} />
                      </ErrorBoundary>                      
                    </React.Suspense>
                  </div>              
                </>        
            )})}
        </SortableDiv>
      </div>
    </div>
  );
};

export default CapagGeral;
