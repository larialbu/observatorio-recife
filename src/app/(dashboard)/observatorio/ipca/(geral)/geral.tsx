import React, { useRef, useState } from "react";

import { IpcaGeralHeaders } from "@/@types/observatorio/@fetch/ipca";
import { ChartBuild } from "@/@types/observatorio/shared";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import ErrorBoundary from "@/utils/loader/errorBoundary";

import charts from "./@imports/charts";

const Geral = ({
  data,
  rawData,
  months,
}: ChartBuild<IpcaGeralHeaders[]>) => {
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));
  const sortableContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="pb-4">
      <SortableDiv chartOrder={chartOrder} setChartOrder={setChartOrder} sortableContainerRef={sortableContainerRef} style="charts-items-wrapper">
      {chartOrder.map((index) => {
          const { Component } = charts[index];
          return (
            <div key={index} className={`chart-content-wrapper`}>
              <React.Suspense fallback={<GraphSkeleton />}>
                <ErrorBoundary>
                  <Component data={data} rawData={rawData} months={months} />
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
