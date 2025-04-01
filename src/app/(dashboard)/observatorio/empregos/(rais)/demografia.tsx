"use client";

import React, { useEffect, useRef, useState } from "react";
import charts from "./@imports/demografia/charts";
import cards from "./@imports/demografia/cards";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import { geralAccFunction } from "@/functions/process_data/observatorio/empregos/rais/demografia/geralFuncition";

const Demografia = ({
  data,
  year,
}: {
  data: any;
  year: string;
}) => {
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));
  const sortableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // a função para calcuar os valores dos gráficos tem que estar aqui (acho legal), ou talvez na pagina de page (acho feio)
    console.log('DEMOGRAFIA (RAIS)', data, year)
    // console.log('Treste', geralAccFunction(data, ["Faixa Etária", "Tipo Defic"]))
    //   console.log('YEAR months', year, months)
    
  }, [])

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {cards.map(({ Component }, index) => (
          <React.Suspense fallback={<div>Carregando...</div>} key={index}>
            {/* <Component data={data} year={year} color={ColorPalette.default[index]} /> */}
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
              {/* <React.Suspense fallback={<GraphSkeleton />}>
                <ErrorBoundary>
                  <Component data={data} rawData={rawData} months={months} />
                </ErrorBoundary>
              </React.Suspense> */}
            </div>
          );
        })}
      </SortableDiv>
    </div>
  );
};

export default Demografia;
