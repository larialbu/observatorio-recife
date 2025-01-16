import React, { useState, useEffect } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import chartsCargas from "./@imports/carga/charts";
import chartsPassageiros from "./@imports/passageiro/charts";
import cardsPassageiros from "./@imports/passageiro/cards";
import cardsCargas from "./@imports/carga/cards";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const AenaPage = () => {
  const { data, isLoading } = useDashboard();
  const [filteredPassageiros, setFilteredPassageiros] = useState([]);
  const [filteredCargas, setFilteredCargas] = useState([]);

  useEffect(() => {
    console.log("Dados recebidos:", data);

    if (data) {
      // Extraindo os dados de passageiros e cargas
      const passageirosData = data.passageiros || {};
      const cargasData = data.cargas || {};

      setFilteredPassageiros(passageirosData.filteredData || []);
      setFilteredCargas(cargasData.filteredData || []);

      console.log("Dados filtrados - Passageiros:", passageirosData.filteredData);
      console.log("Dados filtrados - Cargas:", cargasData.filteredData);
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
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {chartsCargas.map(({ Component }, index) => (
          <Component
            key={`carga-chart-${index}`}
            data={filteredCargas}
            months={[1, 12]}
          />
        ))}
        {chartsPassageiros.map(({ Component }, index) => (
          <Component
            key={`passageiro-chart-${index}`}
            data={filteredPassageiros}
            months={[1, 12]}
          />
        ))}
      </div>
    </div>
  );
};

export default AenaPage;
