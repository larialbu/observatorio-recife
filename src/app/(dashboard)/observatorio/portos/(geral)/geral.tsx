"use client";

import React, { useRef, useState } from "react";
import charts from "./@imports/charts";
import maps from "./@imports/maps";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import tables from "./@imports/tables";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import { ChartBuild } from "@/@types/observatorio/shared";
import { PortoGeralData } from "@/@types/observatorio/@data/portoData";

const Geral = ({
  data,
  months,
}: ChartBuild<PortoGeralData>) => {
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));
  const [tableOrder, setTableOrder] = useState(tables.map((_, index) => index));
  // REF do container e REF da instância do Sortable

  const sortableContainerRef = useRef<HTMLDivElement>(null);
  const sortableContainerTableRef = useRef<HTMLDivElement>(null);

  const { Component } = maps[0]

  return (
    <div>
      <SortableDiv chartOrder={chartOrder} setChartOrder={setChartOrder} sortableContainerRef={sortableContainerRef} style="charts-items-wrapper">
        {chartOrder.map((index) => {
          const { Component } = charts[index];
          return (
            <div
              key={index}
              className={`chart-content-wrapper`}
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

      <div className="place-items-center z-0 mb-6">
        <div className="bg-white dark:bg-[#0C1A28] shadow-md rounded-lg p-4 w-full overflow-x-hidden flex flex-col items-center">
          <Component data={data.coords || []} />
        </div>
      </div>
    </div>
  );
};

export default Geral;
