"use client";

import React, { useEffect, useRef, useState } from "react";

import { SortableDiv } from "@/components/@global/features/SortableDiv";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { geralAccFunction } from "@/functions/process_data/observatorio/rais/demografia/geralFuncition";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import cards from "./@imports/cards";
import charts from "./@imports/charts";
import tables from "./@imports/tables";

const EmpresasAtivasRecife = ({
  data,
  year,
}: {
  data: any;
  year: string;
}) => {
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));
  const [tableOrder, setTableOrder] = useState(tables.map((_, index) => index));

  const sortableContainerRef = useRef<HTMLDivElement>(null);
  const sortableContainerTableRef = useRef<HTMLDivElement>(null);
 
  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {cards.map(({ Component }, index) => (
          <React.Suspense fallback={<div>Carregando...</div>} key={index}>
            <ErrorBoundary>
              <Component
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
          const { Component } = charts[index];
          return (
            <div
              key={index}
              className={`chart-content-wrapper`}
            >
              <React.Suspense fallback={<GraphSkeleton />}>
                <ErrorBoundary>
                  <Component data={data} />
                </ErrorBoundary>
              </React.Suspense>
            </div>
          );
        })}
      </SortableDiv>

      <div className="flex flex-col gap-6">
        <SortableDiv chartOrder={tableOrder} setChartOrder={setTableOrder} sortableContainerRef={sortableContainerTableRef} style={`charts-items-wrapper !grid-cols-1"}`}>
          {tableOrder.map((index) => { 
          const { Component } = tables[index];

            return (
              <div key={index} className="w-full">
                {/* <p className="font-semibold text-2xl text-gray-700 mb-2">
                  {selectCompare[index]}
                </p> */}
                <div
                  className="bg-white shadow-md rounded-lg flex flex-col items-center w-full min-h-[800px]"
                >
          
                    <Component
                      // profissao={[...tempFiltred, ...tempFiltredCBO.map((cbo) => microCagedCboDicts[cbo])]}
                      color={ColorPalette.default[index]}
                      data={data}
                      // data={chartData.filter((obj: any) => obj['município'] === selectCompare[index])}
                      year={year}
                    />
                </div> 
              </div>
 
          )})}
        </SortableDiv>
      </div>
    </div>
  );
};

export default EmpresasAtivasRecife;
