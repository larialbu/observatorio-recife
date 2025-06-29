"use client";

import React, { useEffect, useRef, useState } from "react";

import { SortableDiv } from "@/components/@global/features/SortableDiv";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { cnaeAccFunction, geralAccFunction } from "@/functions/process_data/observatorio/rais/demografia/geralFuncition";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import cards from "./@imports/cards";
import charts from "./@imports/charts";

const Grupo = ({
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
    setChartData({ ...geralAccFunction(data.ativ || [], ["CBO Ocupação 2002", "Sexo Trabalhador", "Escolaridade após 2005", "Raça Cor", "Faixa Etária", "Tipo Defic"]), 
      ...cnaeAccFunction(data.ativ || [], 'CNAE Código')})
  }, [data])

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {cards.slice(0, 1).map(({ Component }, index) => (
          <React.Suspense fallback={<div>Carregando...</div>} key={index}>
            <Component data={data} cards={cards.slice(1)} year={year} ColorPalette={ColorPalette.default} />
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

export default Grupo;
