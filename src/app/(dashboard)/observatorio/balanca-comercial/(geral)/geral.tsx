import React, { useRef, useEffect, useState } from "react";
import Sortable from "sortablejs";
import charts from "./@imports/charts";
import cards from "./@imports/cards";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { SortableDiv } from "@/components/@global/features/SortableDiv";

const Geral = ({ toCompare, data, year, months }: { toCompare?: string[]; data: any; year: string, months: number }) => {
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
              // local={toCompare ? toCompare : []}
              data={data}
              year={year}
              color={ColorPalette.default[index]}
            />
          </React.Suspense>
        ))}
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
                <Component data={data} months={months} />
              </React.Suspense>
            </div>
          );
        })}
      </SortableDiv>
    </div>
  );
};

export default Geral;
