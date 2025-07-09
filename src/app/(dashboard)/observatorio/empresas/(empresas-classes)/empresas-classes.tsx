"use client";

import React, {  useMemo, useRef, useState } from "react";

import { SortableDiv } from "@/components/@global/features/SortableDiv";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import ErrorBoundary from "@/utils/loader/errorBoundary";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import cards from "./@imports/cards";
import charts from "./@imports/charts";
import { geralAccFieldFunction, geralAccFunction } from "@/functions/process_data/observatorio/rais/demografia/geralFuncition";

const EmpresasClasses = ({
  data,
  year,
}: {
  data: any;
  year: string;
}) => {
  const [chartOrder, setChartOrder] = useState(charts.map((_, index) => index));

  const sortableContainerRef = useRef<HTMLDivElement>(null);
 
  const params = ['Municipio', 'mes', 'Subclasse', 'nome_secao', 'secao']
 

  // Estabelecimentos: 1002
  // Municipio: "Salvador"
  // Subclasse: "Fornecimento de alimentos preparados preponderantemente para empresas"
  // ano: 2025
  // mes: 1
  // nome_secao: "ALOJAMENTO E ALIMENTAÇÃO"
  // secao: "I"

  const chartData = useMemo(() => {
    return { 
      empresas: geralAccFieldFunction(data['empresas'], params, 'Estabelecimentos'),
      rawData: {
        municipio: geralAccFieldFunction(data['rawData']['municipio'], params, 'Estabelecimentos'),
        mes: geralAccFieldFunction(data['rawData']['mes'], params, 'Estabelecimentos')
      }
    }
  }, [data, params])  
  

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

export default EmpresasClasses;
