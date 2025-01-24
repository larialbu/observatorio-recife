import React, { useRef, useEffect, useState } from "react";
import Sortable from "sortablejs";
import charts from "./@imports/charts";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { useDashboard } from "@/context/DashboardContext";
import { processPercentageByType } from "@/functions/process_data/observatorio/ipca/grupos/charts/participacaoGrupo";

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

  useEffect(() => {
    if (sortableContainerRef.current) {
      Sortable.create(sortableContainerRef.current, {
        animation: 150,
        onEnd: (evt) => {
          const newOrder = [...chartOrder];
          const [movedItem] = newOrder.splice(evt.oldIndex!, 1);
          newOrder.splice(evt.newIndex!, 0, movedItem);
          setChartOrder(newOrder);
        },
      });
    }
  }, [chartOrder]);

  return (
    <div>
      <div
        ref={sortableContainerRef}
        className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 place-items-center"
      >
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
      </div>
    </div>
  );
};

export default Grupos;
