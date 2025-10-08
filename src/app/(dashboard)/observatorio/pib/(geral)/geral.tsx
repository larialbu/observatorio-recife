import React, { useRef, useState } from "react";

import { SortableDiv } from "@/components/@global/features/SortableDiv";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import cards from "./@imports/cards";
import charts from "./@imports/charts";
import tables from "./@imports/tables";


const Geral = ({ toCompare, data, year, months }: { toCompare?: string[]; data: any; year: string, months: number }) => {
  
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));
  const [tableOrder, setTableOrder] = useState(tables.map((_, index) => index));

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
          const { Component, col } = charts[index];
          return (
            <div
              key={index}
              className={`chart-content-wrapper ${col}`}
            >
              <React.Suspense fallback={<GraphSkeleton />}>
                <ErrorBoundary>
                  <Component data={data} months={months} />
                </ErrorBoundary>
              </React.Suspense>
            </div>
          );
        })}
      </SortableDiv>

      <SortableDiv chartOrder={tableOrder} setChartOrder={setTableOrder} sortableContainerRef={sortableContainerTableRef} style="charts-items-wrapper">
          {tableOrder.map((index) => {
          const { Component, col } = tables[index] as any;
         
          return ( 
            <div
              key={index}
              className={`bg-white shadow-md rounded-lg flex flex-col items-center w-full ${col}`}
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
