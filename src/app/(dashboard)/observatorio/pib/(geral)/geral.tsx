import React, { useEffect, useRef, useState } from "react";
import charts from "./@imports/charts";
import cards from "./@imports/cards";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import tables from "./@imports/tables";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import { useDashboard } from "@/context/DashboardContext";

const Geral = ({ toCompare, data, year, months }: { toCompare?: string[]; data: any; year: string, months: number }) => {
  
  const { chartsContext, setChartsContext } = useDashboard()
 
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));
  const [tableOrder, setTableOrder] = useState(tables.map((_, index) => index));

  useEffect(() => {
    setChartsContext(charts.sort((a, b) => a.order - b.order));
  }, [setChartsContext]);

  useEffect(() => {
    if (chartsContext.length > 0) {
      const orderedCharts = chartsContext
        .map((chart, index) => ({ index, order: chart.order }))
        .sort((a, b) => (a.order === 0 ? 1 : b.order === 0 ? -1 : a.order - b.order))
        .map(({ index }) => index);
  
      setChartOrder(orderedCharts);
    }
  }, [chartsContext]);
  

  // REF do container e REF da instância do Sortable
  const sortableContainerRef = useRef<HTMLDivElement>(null);
  const sortableContainerTableRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {cards.map(({ Component }, index) => (
          <React.Suspense fallback={<div>Carregando...</div>} key={index}>
            <ErrorBoundary>
              <Component
                // local={toCompare ? toCompare : []}
                data={data}
                year={year}
                color={ColorPalette.default[index]}
              />
            </ErrorBoundary>
          </React.Suspense>
        ))}
      </div>

      <SortableDiv chartOrder={chartOrder} setChartOrder={setChartOrder} sortableContainerRef={sortableContainerRef} style="charts-items-wrapper">
        {chartOrder.map((index) => {
           if (!chartsContext[index]) return null;
          
          const { id, Component } = chartsContext[index];
          return (
            <div
              key={index}
              className={`chart-content-wrapper`}
            >
              <React.Suspense fallback={<GraphSkeleton />}>
                <ErrorBoundary>
                  <Component id={id} data={data} months={months} />
                </ErrorBoundary>
              </React.Suspense>
            </div>
          );
        })}
      </SortableDiv>

      <SortableDiv chartOrder={tableOrder} setChartOrder={setTableOrder} sortableContainerRef={sortableContainerTableRef} style="charts-items-wrapper">
          {tableOrder.map((index) => {
          const { Component } = tables[index];
         
          return ( 
            <div
              key={index}
              className="bg-white shadow-md rounded-lg flex flex-col items-center w-full"
            >
              <React.Suspense fallback={<div>Carregando...</div>}>
                <ErrorBoundary>
                  <Component
                    color={ColorPalette.default[index]}
                    data={data}
                  />
                </ErrorBoundary>
              </React.Suspense>
            </div>
          )})}
        </SortableDiv>
    </div>
  );
};

export default Geral;
