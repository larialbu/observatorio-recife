import React, { useRef, useEffect, useState } from "react";

import { BalancaHeaders } from "@/@types/observatorio/@fetch/balanca-comercial";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import cards from "./@imports/cards";
import charts from "./@imports/charts";
import { geralAccFieldSeparetedFunction } from "@/functions/process_data/observatorio/rais/demografia/geralFuncition";

const Geral = ({ data, year, months }: { data: BalancaHeaders[]; year: string, months: number }) => {
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));
  const [chartData, setChartData] = useState({})

  const sortableContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    setChartData(geralAccFieldSeparetedFunction(data, ['tipo', 'País', 'Continente', "Descrição SH4", "Mês"], 'Valor US$', 'tipo'))
  }, [data])

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
          const { Component, col } = charts[index] as any;
          return (
            <div
              key={index}
              className={`chart-content-wrapper ${col}`}
            >
              <React.Suspense fallback={<GraphSkeleton />}>
                <ErrorBoundary>
                  <Component data={chartData}   />
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
