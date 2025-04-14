import React, { useState, useEffect, useRef } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import chartsCargas from "./@imports/carga/charts";
import chartsPassageiros from "./@imports/passageiro/charts";
import cardsPassageiros from "./@imports/passageiro/cards";
import cardsCargas from "./@imports/carga/cards";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import GraphSkeleton from "@/components/random_temp/GraphSkeleton";
import { AenaCargasHeaders, AenaPassageirosHeaders } from "@/@types/observatorio/@fetch/aeroporto";
import { AenaCargasData, AenaPassageirosData } from "@/@types/observatorio/@data/aeroportoData";

const AenaPage = ({ months}: {months: number}) => {
  const { data, isLoading } = useDashboard();
  const [filteredPassageiros, setFilteredPassageiros] = useState<AenaPassageirosHeaders[]>([]);
const [filteredCargas, setFilteredCargas] = useState<AenaCargasHeaders[]>([]);

  const [chartOrder, setChartOrder] = useState([...chartsCargas, ...chartsPassageiros].map((_, index) => index));

  // REF do container e REF da instância do Sortable
  const sortableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (data) {
      // Extraindo os dados de passageiros e cargas
      const passageirosData = data.passageiros || {};
      const cargasData = data.cargas || {};

      setFilteredPassageiros(passageirosData.filteredData || []);
      setFilteredCargas(cargasData.filteredData || []);

    }
  }, [data]);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
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
          const filteredData = type === 'carga' ? filteredCargas as unknown : filteredPassageiros as unknown;
          const rawData = type === 'carga' ? data?.cargas?.rawDataCargas || [] : data?.passageiros?.rawDataPassageiros || [];

          return (
            <div
              key={`chart-${index}`}
              className={`chart-content-wrapper`}
            >
              <React.Suspense fallback={<GraphSkeleton />}>
                <Component data={filteredData as AenaPassageirosData & AenaCargasData} rawData={rawData} months={months} />
              </React.Suspense>
            </div>
          );
        })}
      </SortableDiv>
    </div>
  );
};

export default AenaPage;
