import React, { useRef, useState } from "react";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import charts from "./@imports/charts";
import { SortableDiv } from "@/components/@global/features/SortableDiv";

const Embarque = ({
  toCompare,
  monthRecent,
  data,
}: {
  toCompare: string[];
  monthRecent?: number;
  data: any;
}) => {
  const [type, setType] = useState<["Embarque" | "Desembarque"]>(["Embarque"]);

  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));

  // REF do container e REF da instância do Sortable
  const sortableContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className="flex items-center justify-center mb-6"> 
          <div className="bg-[#D1D5DB] rounded-full p-1">
            <div className="bg-white rounded-full font-semibold items-center grid grid-cols-2  gap-2 text-center relative text-gray-500 p-2">
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
                  toCompare={toCompare}
                  data={data}
                  monthRecent={monthRecent}
                  type={type[0]}
                />
              </React.Suspense>
            </div>
          )})}
      </SortableDiv>
    </div>
  );
};

export default Embarque;
