"use client";

import React, { useEffect, useRef, useState } from "react";
import charts from "./@imports/demografia/charts";
import cards from "./@imports/demografia/cards";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import { geralAccFunction } from "@/functions/process_data/observatorio/empregos/rais/demografia/geralFuncition";

const Demografia = ({
  data,
  year,
}: {
  data: any;
  year: string;
}) => {
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));
  const sortableContainerRef = useRef<HTMLDivElement>(null);

  // setor produtivo (ANALISAR ESSE DADOD) - genero (Sexo Trabalhador) - faixa etearia - grau de instrução (Escolaridade após 2005) - necessidade especial (Tipo Defic) - raça (Raça Cor)
  console.log('ATIV ->', geralAccFunction(data.ativ, ["Sexo Trabalhador", "Escolaridade após 2005", "Raça Cor", "Faixa Etária", "Tipo Defic"])) 
  console.log('NOATIV ->>', geralAccFunction(data.noAtiv, ["Sexo Trabalhador", "Escolaridade após 2005", "Raça Cor", "Faixa Etária", "Tipo Defic"])) 


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
            >a
              {/* <React.Suspense fallback={<GraphSkeleton />}>
                <ErrorBoundary>
                  <Component data={data} rawData={rawData} months={months} />
                </ErrorBoundary>
              </React.Suspense> */}
            </div>
          );
        })}
      </SortableDiv>
    </div>
  );
};

export default Demografia;
