import React, { useRef, useEffect, useState } from "react";
import Sortable from "sortablejs";
import charts from "./@imports/charts";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { useDashboard } from "@/context/DashboardContext";
import { processPercentageByType } from "@/functions/process_data/observatorio/ipca/grupos/charts/participacaoGrupo";
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
      const gruposData = data.grupos || {}

      setGruposData(gruposData.filteredData || [])
    }
  }, [data]);

  return (
    <div>
       <SortableDiv chartOrder={chartOrder} setChartOrder={setChartOrder} sortableContainerRef={sortableContainerRef} style="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 place-items-center">
        {chartOrder.map((index) => {
          const { Component } = charts[index];
          return (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 w-full flex flex-col items-center"
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
