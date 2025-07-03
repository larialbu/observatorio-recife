"use client";

import React, { memo, useEffect, useMemo, useRef, useState } from "react";

import { SortableDiv } from "@/components/@global/features/SortableDiv";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { getDataObj } from "@/functions/process_data/observatorio/micro-caged/getDataObj";
import { getSaldoData } from "@/functions/process_data/observatorio/micro-caged/getSaldoData";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import cards from "./@imports/cards";
import charts from "./@imports/charts";
import { geralAccFunction } from "@/functions/process_data/observatorio/rais/demografia/geralFuncition";
import maps from "./@imports/maps";


const EmpresasAtivasInativas = ({
  data,
  year,
}: {
  data: any;
  year: string;
}) => {
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));

  const sortableContainerRef = useRef<HTMLDivElement>(null);

  const params = ['nome_bairro', 'Grupo', 'desc_atividade', 'mes']

  const chartData = useMemo(() => {
    return {
        ativas: geralAccFunction(data['ativas'], params),
        inativas: geralAccFunction(data['inativas'], params) 
      }
  }, [data, params])  

  const { Component }: any = maps[0]

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {cards.map(({ Component }, index) => (
          <React.Suspense fallback={<div>Carregando...</div>} key={index}>
            <ErrorBoundary>
              <Component
                data={chartData}
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
                  <Component data={chartData} />
                </ErrorBoundary>
              </React.Suspense>
            </div>
          );
        })}
      </SortableDiv>

      {/* <div className="place-items-center z-0 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4 w-full overflow-x-hidden flex flex-col items-center">
          <Component data={data} />
        </div>
      </div> */}
    </div>
  );
};

export default EmpresasAtivasInativas;
