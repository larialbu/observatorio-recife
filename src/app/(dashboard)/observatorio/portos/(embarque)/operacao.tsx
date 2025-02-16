"use client";

import React, { useRef, useState } from "react";
import charts from "./@imports/charts";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { SortableDiv } from "@/components/@global/features/SortableDiv";

const Operacao = ({
  data,
  // year,
  months,
}: {
  data: any;
  // year: string;
  months: number;
}) => {


  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));

  // REF do container e REF da instância do Sortable
  const sortableContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <SortableDiv 
        chartOrder={chartOrder} 
        setChartOrder={setChartOrder} 
        sortableContainerRef={sortableContainerRef} 
        style="charts-items-wrapper"
      >
        {chartOrder.map((index) => {
          const { Component } = charts[index];

          return (
            <div key={index} className="chart-content-wrapper">
              <React.Suspense fallback={<GraphSkeleton />}>
                <Component data={data} months={months} />
              </React.Suspense>
            </div>
          );
        })}
      </SortableDiv>

    </div>
  );
};

export default Operacao;
