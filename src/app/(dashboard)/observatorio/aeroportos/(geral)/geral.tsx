"use client";

import React, { useEffect, useRef, useState } from "react";

import { AnacChartData } from "@/@types/observatorio/@fetch/aeroporto";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import cards from "./@imports/cards";
import charts from "./@imports/charts";
import { geralAccGroupValuesFunction } from "@/functions/process_data/observatorio/rais/demografia/geralFuncition";



const Geral = ({
  data   
}: {
  data: any;
}) => {
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));
  const sortableContainerRef = useRef<HTMLDivElement>(null);
  const [chartData, setChartData] = useState({anac: {}, rawData: {}})

  useEffect(() => {
    setChartData({
      anac: geralAccGroupValuesFunction(data?.anac || [], ['AEROPORTO NOME', 'MÊS', 'NATUREZA'], ['DECOLAGENS', 'CARGA', 'PASSAGEIRO']), 
      rawData: {
        "AEROPORTO NOME": geralAccGroupValuesFunction(data?.rawData?.["AEROPORTO NOME"] || [], ['AEROPORTO NOME', 'MÊS', 'NATUREZA'], ['DECOLAGENS', 'CARGA', 'PASSAGEIRO']),
        "MÊS": geralAccGroupValuesFunction(data?.rawData?.["MÊS"] || [], ['AEROPORTO NOME', 'MÊS', 'NATUREZA'], ['DECOLAGENS', 'CARGA', 'PASSAGEIRO'])
      }
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
                  <Component data={chartData as AnacChartData}    />
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
