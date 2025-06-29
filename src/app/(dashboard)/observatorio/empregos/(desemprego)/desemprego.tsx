"use client";

import React, { useEffect, useRef, useState } from "react";

import { SortableDiv } from "@/components/@global/features/SortableDiv";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import cards from "./@imports/cards";
import charts from "./@imports/charts";
import maps from "./@imports/maps";

const Desemprego = ({
  data,
  year,
  months,
}: {
  data: any;
  year: string;
  months: number;
}) => {
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));
  const sortableContainerRef = useRef<HTMLDivElement>(null);
  const [chartData, setChartData] = useState({})

  useEffect(() => {
      setChartData(data)
  }, [data])

  const { Component }: any = maps[0]

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {cards.map(({ Component }, index) => (
          <React.Suspense fallback={<div>Carregando...</div>} key={index}>
            <Component data={chartData} year={year} color={ColorPalette.default[index]} />
          </React.Suspense>
        ))}
      </div>

      <SortableDiv chartOrder={chartOrder} setChartOrder={setChartOrder} sortableContainerRef={sortableContainerRef} style="charts-items-wrapper 2xl:grid-cols-2">
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

      <div className="place-items-center z-0 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4 w-full overflow-x-hidden flex flex-col items-center">
          <Component data={data} />
        </div>
      </div>
    </div>
  );
};

export default Desemprego;
