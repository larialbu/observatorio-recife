import React, { useRef, useEffect, useState } from "react";
import Sortable from "sortablejs";
import charts from "./@imports/charts";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { SortableDiv } from "@/components/@global/features/SortableDiv";

const Geral = ({
  data,
  rawData,
  year,
  months,
}: {
  data: any;
  rawData: any
  year: string;
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
            <div
              key={index}
              className={`chart-content-wrapper`}
            >
              <React.Suspense fallback={<GraphSkeleton />}>
                <Component data={data} rawData={rawData} months={months} />
              </React.Suspense>
            </div>
          );
        })}
       </SortableDiv>
    </div>
  );
};

export default Geral;
