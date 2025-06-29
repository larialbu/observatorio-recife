import React, { useRef, useEffect, useState } from "react";

import { IpcaGrupoData } from "@/@types/observatorio/@data/ipcaData";
import { IpcaGrupoHeaders } from "@/@types/observatorio/@fetch/ipca";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { useDashboard } from "@/context/DashboardContext";

import charts from "./@imports/charts";

const Grupos = () => {
  const { data } = useDashboard();
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));
  const [gruposData, setGruposData] = useState<IpcaGrupoHeaders[]>([])
  const sortableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data?.id === "ipca-grupos") {
      const grupos = (data as { grupos?: IpcaGrupoData }).grupos;
      if (grupos?.filteredData) {
        setGruposData(grupos.filteredData || []);
      }
    }
  }, [data]);
  return (
    <div>
       <SortableDiv chartOrder={chartOrder} setChartOrder={setChartOrder} sortableContainerRef={sortableContainerRef} style="charts-items-wrapper">
        {chartOrder.map((index) => {
          const { Component } = charts[index];
          return (
            <div
              key={index}
              className={`chart-content-wrapper`}
            >
              <React.Suspense fallback={<GraphSkeleton />}>
                <Component data={gruposData}   />
              </React.Suspense>
            </div>
          );
        })}
      </SortableDiv>
    </div>
  );
};

export default Grupos;
