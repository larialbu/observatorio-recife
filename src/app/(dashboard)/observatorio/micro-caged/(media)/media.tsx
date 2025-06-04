"use client";

import React, { useEffect, useRef, useState } from "react";
import charts from "./@imports/charts";
import cards from "./@imports/cards";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { getAccSalario } from "@/functions/process_data/observatorio/micro-caged/getAccSalario";
import { getDataObj } from "@/functions/process_data/observatorio/micro-caged/getDataObj";


const Media = ({
  data,
  year,
}: {
  data: any;
  year: string;
}) => {
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));
  const sortableContainerRef = useRef<HTMLDivElement>(null);
  const [chartData, setChartData] = useState({})
  
  useEffect(() => {
    // nesse 1518, temos q pegar a primeira linha data[0] e pegar oa param sm (salário minimo) data[0]['sm'], ele vai retornar o valor do salário minimo
    const dataFiltred = data.filter((obj: any) => obj['indtrabintermitente'] == 0 && obj['salário'] > 1518 * 0.3 && obj['salário'] < 1518 * 150)

    const dataObj = getDataObj(dataFiltred)

    const keysObj = Object.keys(data?.[0] || []).filter(key => !['salário', 'competênciamov', 'ano', 'município', 'unidadesaláriocódigo', 'valorsaláriofixo'].includes(key))

    const dataSalario = getAccSalario(dataFiltred, keysObj)

    setChartData({ quantity: dataObj, values: dataSalario})
  }, [data])

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {cards.map(({ Component }, index) => (
          <React.Suspense fallback={<div>Carregando...</div>} key={index}>
            <ErrorBoundary>
              <Component
                data={chartData}
                year={year}
                color={ColorPalette.default[index]}
              />
            </ErrorBoundary>
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
                <ErrorBoundary>
                  <Component data={chartData} />
                </ErrorBoundary>
              </React.Suspense>
            </div>
          );
        })}
      </SortableDiv>
    </div>
  );
};

export default Media;
