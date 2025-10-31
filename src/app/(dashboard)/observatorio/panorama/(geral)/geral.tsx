"use client";

import React, { useRef, useState } from "react";

import { AnacChartData } from "@/@types/observatorio/@fetch/aeroporto";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import ErrorBoundary from "@/utils/loader/errorBoundary";

import charts from "./@imports/charts";
import Link from "next/link";


const Geral = ({
  data   
}: {
  data: any;
}) => {
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));
  const sortableContainerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div>
      <SortableDiv chartOrder={chartOrder} setChartOrder={setChartOrder} sortableContainerRef={sortableContainerRef} style="charts-items-wrapper">
        {chartOrder.map((index) => {
          const { Component, col, goTo, icon, logo } = charts[index];
          return (
            <Link
              href={goTo}
              key={index}
              className={`chart-content-wrapper hover:!cursor-pointer relative group ${col}`}
            >

              <div className="absolute w-[60px] h-[60px] top-2 left-2 z-10 group-hover:scale-105 hover:rotate-[-10deg] transition-all duration-300 ease-in-out">
                <div className="rounded-full p-2 border-[2px] border-[#3b82f6]">
                  {React.cloneElement(icon, {
                      className: `${icon.props.className} transition-transform duration-300 ease-in-out`,
                  })}
                </div>
              </div>

              <div className="w-full mt-10">
                <React.Suspense fallback={<GraphSkeleton />}>
                  <ErrorBoundary>
                    <Component data={data as AnacChartData}/>
                  </ErrorBoundary>
                </React.Suspense>
              </div>
              
            </Link>
          );
        })}
      </SortableDiv>
    </div>
  );
};

export default Geral;
