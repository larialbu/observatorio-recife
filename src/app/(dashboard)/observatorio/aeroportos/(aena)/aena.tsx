import React, { useState, useEffect, useRef } from "react";

import { AenaCargasHeaders, AenaPassageirosHeaders } from "@/@types/observatorio/@fetch/aeroporto";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import cardsCargas from "./@imports/carga/cards";
import chartsCargas from "./@imports/carga/charts";
import cardsPassageiros from "./@imports/passageiro/cards";
import chartsPassageiros from "./@imports/passageiro/charts";


const AenaPage = ({data, months, year}: {data: any, months: number, year: string}) => {
  const [filteredPassageiros, setFilteredPassageiros] = useState<AenaPassageirosHeaders[]>([]);
  const [filteredCargas, setFilteredCargas] = useState<AenaCargasHeaders[]>([]);

  const [chartOrder, setChartOrder] = useState([...chartsCargas, ...chartsPassageiros].map((_, index) => index));

  const sortableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      setFilteredPassageiros(data.passageiros || []);
      setFilteredCargas(data.cargas || []);
  }, [data]);


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
        Movimentação AENA
      </h2>

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {cardsPassageiros.map(({ Component }, index) => (
          <Component
            key={`passageiro-card-${index}`}
            data={filteredPassageiros}
            year={year}
            color={ColorPalette.default[index]}
          />
        ))}
        {cardsCargas.map(({ Component }, index) => (
          <Component
            key={`carga-card-${index}`}
            data={filteredCargas}
            year={year}
            color={ColorPalette.default[index]}
          />
        ))}
      </div>

      {/* Gráficos de Passageiros e Cargas */}
      <SortableDiv chartOrder={chartOrder} setChartOrder={setChartOrder} sortableContainerRef={sortableContainerRef} style="charts-items-wrapper">
        {chartOrder.map((index) => {
          const charts = [
            ...chartsCargas.map(chart => ({ ...chart, type: 'carga' })), 
            ...chartsPassageiros.map(chart => ({ ...chart, type: 'passageiro' }))
          ];

          const { Component, type } = charts[index]; // 'type' pode indicar se é carga ou passageiro
            const filteredData = type === 'carga' ? filteredCargas: filteredPassageiros;
            const rawData = type === 'carga' ? data?.rawData?.cargas || [] : data?.rawData?.passageiros || [];

            return (
              <div key={`chart-${index}`} className="chart-content-wrapper">
                <React.Suspense fallback={<GraphSkeleton />}>
                <Component data={filteredData as AenaCargasHeaders[] & AenaPassageirosHeaders[]} rawData={rawData as AenaCargasHeaders[] & AenaPassageirosHeaders[]} months={months} />
                </React.Suspense>
              </div>
            );
        })}
      </SortableDiv>
    </div>
  );
};

export default AenaPage;
