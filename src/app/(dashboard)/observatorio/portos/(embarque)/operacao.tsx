"use client";

import React, { useRef, useState } from "react";
import charts from "./@imports/charts";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import cards from "./@imports/cards";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { ChartBuild } from "@/@types/observatorio/shared";
import { PortoGeralData, PortoOperacaoData } from "@/@types/observatorio/@data/portoData";

const Operacao = ({
  data,
  year,
  months,
}: ChartBuild<PortoGeralData & PortoOperacaoData[]>) => {
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));

  // REF do container e REF da instância do Sortable
  const sortableContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {cards.slice(0, 1).map(({ Component }, index) => (
          <React.Suspense fallback={<div>Carregando...</div>} key={index}>
            <Component data={data} cards={cards.slice(1)} year={year ?? "2024"} color={ColorPalette.default} />
          </React.Suspense>
        ))}
      </div>

      <SortableDiv 
        chartOrder={chartOrder} 
        setChartOrder={setChartOrder} 
        sortableContainerRef={sortableContainerRef} 
        style="charts-items-wrapper"
      >
        {chartOrder.map((index) => {
          const { Component, col } = charts[index];

          return (
            <div key={index} className={`chart-content-wrapper ${col === 'full' && 'col-span-full'}`}>
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
