import React, { useState, useEffect, useRef } from "react";

import { AenaCargasData, AenaPassageirosData } from "@/@types/observatorio/@data/aeroportoData";
import { AenaCargasHeaders, AenaPassageirosHeaders } from "@/@types/observatorio/@fetch/aeroporto";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { useDashboard } from "@/context/DashboardContext";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

import cardsCargas from "./@imports/carga/cards";
import chartsCargas from "./@imports/carga/charts";
import cardsPassageiros from "./@imports/passageiro/cards";
import chartsPassageiros from "./@imports/passageiro/charts";


const AenaPage = ({ months}: {months: number}) => {
  const { data, isLoading } = useDashboard();
  const [filteredPassageiros, setFilteredPassageiros] = useState<AenaPassageirosHeaders[]>([]);
const [filteredCargas, setFilteredCargas] = useState<AenaCargasHeaders[]>([]);

  const [chartOrder, setChartOrder] = useState([...chartsCargas, ...chartsPassageiros].map((_, index) => index));

  // REF do container e REF da instância do Sortable
  const sortableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data?.id === "aena") {
      setFilteredPassageiros(data.passageiros?.filteredData || []);
      setFilteredCargas(data.cargas?.filteredData || []);
    }
  }, [data]);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
        Movimentação AENA
      </h2>

      {/* Cards de Passageiros e Cargas */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {cardsPassageiros.map(({ Component }, index) => (
          <Component
            key={`passageiro-card-${index}`}
            data={filteredPassageiros}
            year="2024"
            color={ColorPalette.default[index]}
          />
        ))}
        {cardsCargas.map(({ Component }, index) => (
          <Component
            key={`carga-card-${index}`}
            data={filteredCargas}
            year="2024"
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
          if (data?.id === "aena") {
            const filteredData = type === 'carga' ? filteredCargas: filteredPassageiros;
            const rawData = type === 'carga' ? data?.cargas?.rawDataCargas|| [] : data?.passageiros?.rawDataPassageiros || [];
          
            return (
              <div key={`chart-${index}`} className="chart-content-wrapper">
                <React.Suspense fallback={<GraphSkeleton />}>
                <Component data={filteredData as AenaCargasHeaders[] & AenaPassageirosHeaders[]} rawData={rawData as AenaCargasHeaders[] & AenaPassageirosHeaders[]} months={months} />
                </React.Suspense>
              </div>
            );
          }
        })}
      </SortableDiv>
    </div>
  );
};

export default AenaPage;
