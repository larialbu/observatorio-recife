import React, { useRef, useEffect, useState } from "react";
import charts from "./@imports/charts";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { useDashboard } from "@/context/DashboardContext";
import { SortableDiv } from "@/components/@global/features/SortableDiv";

const Grupos = ({
  year,
}: {
  year: string;
}) => {
  const { data, isLoading } = useDashboard();
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));
  const [gruposData, setGruposData] = useState([])
  const sortableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      console.log(data)
      const gruposData = data?.grupos || {}

      setGruposData(gruposData?.filteredData || [])
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
