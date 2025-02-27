import React, { useState, useEffect, useRef } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import chartsCargas from "./@imports/charts";
import chartsPassageiros from "./@imports/charts";
import cardsPassageiros from "./@imports/cards";
import cardsCargas from "./@imports/cards";
import cards from "./@imports/cards";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import { processPassageirosTotalizados } from "@/functions/process_data/observatorio/porto/passageiro/cards/passageirosTotalizados";
import { processPassageirosAnoPorto } from "@/functions/process_data/observatorio/porto/passageiro/charts/passageirosAnoPorto";
import { processPassageirosPorOperacao } from "@/functions/process_data/observatorio/porto/passageiro/charts/passageirosPorOperacao";

const AenaPage = ({ months}: {months: number}) => {
  const { data, isLoading } = useDashboard();
  const [passageiros, setPassageiros] = useState({ passageiros: { current: [], past:  []}})
  const [filteredPassageiros, setFilteredPassageiros] = useState([]);
  const [filteredCargas, setFilteredCargas] = useState([]);

  const defaultData = { passageiros: { current: [], past:  []}}
  

  const [chartOrder, setChartOrder] = useState([...chartsCargas, ...chartsPassageiros].map((_, index) => index));

  // REF do container e REF da instância do Sortable
  const sortableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (data) {

      const passageirosData = { passageiros: { current: data.passageiros?.current?.filteredData || [], past: data.passageiros?.past?.filteredData || []}}

      setPassageiros(passageirosData)
    }
  }, [data]);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Movimentação Passagiros (Recife)
      </h2>

      {/* Cards de Passageiros e Cargas */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {cards.slice(0, 1).map(({ Component }, index) => (
          <React.Suspense fallback={<div>Loading...</div>} key={index}>
            <Component data={passageiros} cards={cards.slice(1)} ColorPalette={ColorPalette.default} />
          </React.Suspense>
        ))}
      </div>

      {/* Gráficos de Passageiros e Cargas */}
      {/* <SortableDiv chartOrder={chartOrder} setChartOrder={setChartOrder} sortableContainerRef={sortableContainerRef} style="charts-items-wrapper">
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
      </SortableDiv> */}
    </div>
  );
};

export default AenaPage;
