"use client";

import React, { useEffect, useRef, useState } from "react";

import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";
import { ChartBuild } from "@/@types/observatorio/shared";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import cards from "./@imports/cards";
import charts from "./@imports/charts";
import { geralAccGroupValuesFunction } from "@/functions/process_data/observatorio/rais/demografia/geralFuncition";

type DataType = Record<string, Record<string, Record<string, number>>>;


const Geral: React.FC<ChartBuild> = ({
  data,
  rawData,
}) => {
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));
  const sortableContainerRef = useRef<HTMLDivElement>(null);
  const [chartData, setChartData] = useState({data: {}, rawData: {}})

  useEffect(() => {
    setChartData({
      data: geralAccGroupValuesFunction(data, ['AEROPORTO NOME', 'MÊS', 'NATUREZA'], ['DECOLAGENS', 'CARGA', 'PASSAGEIRO']), 
      rawData: geralAccGroupValuesFunction(rawData, ['AEROPORTO NOME', 'MÊS', 'NATUREZA'], ['DECOLAGENS', 'CARGA', 'PASSAGEIRO'])
    })
  }, [data])

  
  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {cards.map(({ Component }, index) => (
          <React.Suspense fallback={<div>Carregando...</div>} key={index}>
            <Component data={data} color={ColorPalette.default[index]} />
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
                  <Component data={chartData.data as DataType} rawData={chartData.rawData as DataType}  />
                </ErrorBoundary>
              </React.Suspense>
            </div>
          );
        })}
      </SortableDiv>
    </div>
  );
};

export default Geral;
