import React, { useRef, useState } from "react";

import { AnacGeralData } from "@/@types/observatorio/@data/aeroportoData";
import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";
import { ChartBuild } from "@/@types/observatorio/shared";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";

import charts from "./@imports/charts";

const Embarque: React.FC<ChartBuild> = ({
  toCompare,
  monthRecent,
  data,
}) => {
  const [type, setType] = useState(['Embarque']);
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));

  const sortableContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className="flex items-center justify-center mb-6"> 
          <div className="bg-[#D1D5DB] dark:bg-gray-600 rounded-full p-1">
            <div className="bg-white dark:bg-gray-800 rounded-full font-semibold items-center grid grid-cols-2  gap-2 text-center relative text-gray-500 dark:text-gray-400 p-2">
             <div className={`transition duration-300 absolute bg-gradient-to-r from-blue-500 to-blue-700 w-1/2 h-full rounded-full ${type[0] === 'Embarque' ? 'transform translate-x-0' : 'transform translate-x-full'} p-4 `}></div>
             <button onClick={() => {
              if (type[0] !== 'Embarque') {
                setType(['Embarque'])
              } else if (type[0] === 'Embarque') {
                setType(['Desembarque'])
              }
              }} className={`${type[0] === 'Embarque' && 'text-white'} z-20 px-3`}>
              Embarque
             </button>
             <button onClick={() => {
              if (type[0] !== 'Desembarque') {
                setType(['Desembarque'])
              } else if (type[0] === 'Desembarque') {
                setType(['Embarque'])
              }
              }} className={`${type[0] === 'Desembarque' && 'text-white'} z-20 px-3`}>
              Desembarque
             </button>
          </div>
          </div>
      </div>

      <SortableDiv chartOrder={chartOrder} setChartOrder={setChartOrder} sortableContainerRef={sortableContainerRef} style="charts-items-wrapper">
        {chartOrder.map((index) => { 
          const { Component } = charts[index];
            return (
            <div
              key={index}
              className={`chart-content-wrapper`}
            >
              <React.Suspense fallback={<GraphSkeleton />}>
                <Component
                  toCompare={toCompare ?? []}
                  data={data as AnacGeralHeaders[]}
                  months={monthRecent ?? 1}
                  type={type[0] as "Embarque" | "Desembarque"}
                />
              </React.Suspense>
            </div>
          )})}
      </SortableDiv>
    </div>
  );
};

export default Embarque;
