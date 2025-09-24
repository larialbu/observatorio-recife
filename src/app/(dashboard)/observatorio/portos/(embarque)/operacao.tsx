"use client";

import React, { useEffect, useRef, useState } from "react";

import { PortoGeralData, PortoOperacaoData } from "@/@types/observatorio/@data/portoData";
import { ChartBuild } from "@/@types/observatorio/shared";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import cards from "./@imports/cards";
import charts from "./@imports/charts";
import { getChartDataModelOperacao } from "@/functions/process_data/observatorio/porto/getChartModel";



const Operacao = ({
  data,
  year,
  months,
}: ChartBuild<PortoGeralData & PortoOperacaoData[]>) => {
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));
  const [chartData, setChartData] = useState<any>({})

  // REF do container e REF da instância do Sortable
  const sortableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!Array.isArray(data?.accumulated)) return;

    const params = ['CDMercadoria', 'Destino', 'Origem', 'Mes', 'Ação']

    const dataAccumulatedField = getChartDataModelOperacao(data?.accumulated || [], params, 'VLPesoCargaBruta')
    setChartData({ ...data, accumulated: dataAccumulatedField })
  }, [data]);

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {cards.slice(0, 1).map(({ Component }, index) => (
          <React.Suspense fallback={<div>Carregando...</div>} key={index}>
            <Component data={chartData} cards={cards.slice(1)} year={year ?? "2024"} color={ColorPalette.default} />
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
                <Component data={chartData} months={months} />
              </React.Suspense>
            </div>
          );
        })}
      </SortableDiv>

    </div>
  );
};

export default Operacao;
