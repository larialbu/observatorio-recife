import React, { useState, useEffect, useRef } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import chartsCargas from "./@imports/carga/charts";
import chartsPassageiros from "./@imports/passageiro/charts";
import cardsPassageiros from "./@imports/passageiro/cards";
import cardsCargas from "./@imports/carga/cards";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { SortableDiv } from "@/components/@global/features/SortableDiv";

const AenaPage = ({ months}: {months: number}) => {
  const { data, isLoading } = useDashboard();
  const [filteredPassageiros, setFilteredPassageiros] = useState([]);
  const [filteredCargas, setFilteredCargas] = useState([]);

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
      <SortableDiv chartOrder={chartOrder} setChartOrder={setChartOrder} sortableContainerRef={sortableContainerRef} style="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {chartsCargas.map(({ Component }, index) => (
          <Component
            key={`carga-chart-${index}`}
            data={filteredCargas}
            rawData={data?.cargas?.rawDataCargas || []}
            months={months}
          />
        ))}
        {chartsPassageiros.map(({ Component }, index) => (
          <Component
            key={`passageiro-chart-${index}`}
            data={filteredPassageiros}
            rawData={data?.passageiros?.rawDataPassageiros || []}
            months={months}
          />
        ))}
      </SortableDiv>
    </div>
  );
};

export default AenaPage;
