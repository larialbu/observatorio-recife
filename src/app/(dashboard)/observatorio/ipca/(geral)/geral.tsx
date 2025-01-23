import React, { useRef, useEffect, useState } from "react";
import Sortable from "sortablejs";
import charts from "./@imports/charts";
import cards from "./@imports/cards";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";

const Geral = ({ data, year, months }: { data: any; year: string, months: number }) => {
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));
  const sortableContainerRef = useRef<HTMLDivElement>(null);

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
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {cards.map(({ Component }, index) => (
          <React.Suspense fallback={<div>Loading...</div>} key={index}>
            <Component
              data={data}
              year={year}
              color={ColorPalette.default[index]}
            />
          </React.Suspense>
        ))}
      </div>

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
                <Component data={data} months={months} />
              </React.Suspense>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Geral;
