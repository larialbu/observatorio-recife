"use client";

import React, { useRef, useState } from "react";

import { SortableDiv } from "@/components/@global/features/SortableDiv";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import charts from "./@imports/charts";

const Regional = ({ data }: { data: any }) => {
  const [chartOrder, setChartOrder] = useState(charts.map((_, i) => i));
  const sortableContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="pb-4">
      <SortableDiv chartOrder={chartOrder} setChartOrder={setChartOrder} sortableContainerRef={sortableContainerRef} style="charts-items-wrapper">
        {chartOrder.map((index) => {
          const { Component, wide } = charts[index];
          return (
            <div key={index} className={`chart-content-wrapper${wide ? " col-span-full" : ""}`}>
              <React.Suspense fallback={<GraphSkeleton />}>
                <ErrorBoundary>
                  <Component data={data} colors={ColorPalette.default} />
                </ErrorBoundary>
              </React.Suspense>
            </div>
          );
        })}
      </SortableDiv>
    </div>
  );
};

export default Regional;
