"use client";

import React, { useEffect, useRef, useState } from "react";

import { PortoGeralData, PortoOperacaoData } from "@/@types/observatorio/@data/portoData";
import { ChartBuild } from "@/@types/observatorio/shared";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import cards from "./@imports/cards";
import charts from "./@imports/charts";
import { geralAccFieldFunction } from "@/functions/process_data/observatorio/rais/demografia/geralFuncition";



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
    if (!Array.isArray(data?.atracacao)) return;

    const newData = []

    for (let i = 0; i < data.carga?.length; i++) {
      const cargaData = data?.atracacao?.find(c => c.IDAtracacao === data?.carga[i].IDAtracacao)
      if (!cargaData) continue;
      newData.push({ ...data?.carga[i], ...cargaData });
    }

    const params = ['CDMercadoria', 'Destino', 'Origem', 'Mes']

    const dataAccumulatedField = geralAccFieldFunction(newData, params, 'VLPesoCargaBruta')

    console.log('New Data ->0<-', newData);

    console.log('Data Accumulated FIEDLD', dataAccumulatedField);

    setChartData({ ...data, accumulated: dataAccumulatedField })
  }, [data]);

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
                <Component data={chartData} months={months} />
                {/* <Component data={data} months={months} /> */}
              </React.Suspense>
            </div>
          );
        })}
      </SortableDiv>

    </div>
  );
};

export default Operacao;
