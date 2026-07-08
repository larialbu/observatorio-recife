"use client";

import React, { useRef, useState } from "react";

import { SortableDiv } from "@/components/@global/features/SortableDiv";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import cards from "./@imports/cards";
import charts from "./@imports/charts";

const TOP_ROW_SIZE = 2;

const ItbiContribuintes = ({ data, year }: { data: any; year?: string }) => {
  const topCharts = charts.slice(0, TOP_ROW_SIZE);
  const bottomCharts = charts.slice(TOP_ROW_SIZE);

  const [topOrder, setTopOrder] = useState(topCharts.map((_, i) => i));
  const [bottomOrder, setBottomOrder] = useState(bottomCharts.map((_, i) => i));
  const topContainerRef = useRef<HTMLDivElement>(null);
  const bottomContainerRef = useRef<HTMLDivElement>(null);

  const renderChart = (chart: (typeof charts)[number], index: number) => {
    const { Component, span } = chart;
    const spanClass = span === 2 ? " md:col-span-2 lg:col-span-2" : "";
    return (
      <div key={index} className={`chart-content-wrapper w-full${spanClass}`}>
        <React.Suspense fallback={<GraphSkeleton />}>
          <ErrorBoundary>
            <Component data={data} colors={ColorPalette.default} />
          </ErrorBoundary>
        </React.Suspense>
      </div>
    );
  };

  return (
    <div className="pb-4">
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {cards.map(({ Component }, index) => (
          <React.Suspense fallback={<div className="min-w-[310px] h-[120px] bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />} key={index}>
            <ErrorBoundary>
              <Component data={data} year={year} color={ColorPalette.default[index]} />
            </ErrorBoundary>
          </React.Suspense>
        ))}
      </div>

      <SortableDiv
        chartOrder={topOrder}
        setChartOrder={setTopOrder}
        sortableContainerRef={topContainerRef}
        style="grid items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-3 gap-8 place-items-stretch pb-8"
      >
        {topOrder.map((index) => renderChart(topCharts[index], index))}
      </SortableDiv>

      <SortableDiv
        chartOrder={bottomOrder}
        setChartOrder={setBottomOrder}
        sortableContainerRef={bottomContainerRef}
        style="grid items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-3 gap-8 place-items-center pb-16"
      >
        {bottomOrder.map((index) => renderChart(bottomCharts[index], TOP_ROW_SIZE + index))}
      </SortableDiv>
    </div>
  );
};

export default ItbiContribuintes;
