import React, { useRef, useState } from "react";
import charts from "./@imports/charts";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import ErrorBoundary from "@/utils/loader/errorBoundary";

const Geral = ({
  data,
  rawData,
  months,
}: {
  data: any;
  rawData: any
  months: number;
}) => {
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
