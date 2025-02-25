import React, { useState, useEffect, useRef } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { LoadingScreen } from "@/components/home/LoadingScreen";
import chartsCargas from "./@imports/carga/charts";
import chartsPassageiros from "./@imports/passageiro/charts";
import cardsPassageiros from "./@imports/passageiro/cards";
import cardsCargas from "./@imports/carga/cards";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { SortableDiv } from "@/components/@global/features/SortableDiv";
import { processPassageirosTotalizados } from "@/functions/process_data/observatorio/porto/passageiro/cards/passageirosTotalizados";
import { processPassageirosAnoPorto } from "@/functions/process_data/observatorio/porto/passageiro/charts/passageirosAnoPorto";
import { processPassageirosPorOperacao } from "@/functions/process_data/observatorio/porto/passageiro/charts/passageirosPorOperacao";

const AenaPage = ({ months}: {months: number}) => {
  const { data, isLoading } = useDashboard();
  const [passageiros, setPassageiros] = useState({})
  const [filteredPassageiros, setFilteredPassageiros] = useState([]);
  const [filteredCargas, setFilteredCargas] = useState([]);

  const defaultData = { passageiros: { current: [], past:  []}}
  

  const [chartOrder, setChartOrder] = useState([...chartsCargas, ...chartsPassageiros].map((_, index) => index));

  // REF do container e REF da instância do Sortable
  const sortableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (data) {
      console.log('DATA NA PAGINA AAA', data)
      // console.log('ALGUMA COISA 1', data.passageiros.current.filteredData)
      // console.log('ALGUMA COISA 2', data.passageiros.past.filteredData)

      const passageirosData = { passageiros: { current: data.passageiros.current.filteredData, past: data.passageiros.past.filteredData}}
      console.log('DATA NA PAGINA BBBB', passageirosData)

      console.log('PASSAGIEROS TOTALIZADOSS', processPassageirosTotalizados(passageirosData.passageiros.current))
      console.log('PASSAGIEROS TOTALIZADOSS', processPassageirosTotalizados(passageirosData.passageiros.past))
      console.log('PASSAGIEROS POR MES ', processPassageirosAnoPorto(passageirosData.passageiros.current, passageirosData.passageiros.past))
      console.log('PASSAGEIROS POR COISA ', processPassageirosPorOperacao(passageirosData.passageiros.current))

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
      {/* <div className="flex flex-wrap gap-4 justify-center mb-8">
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
      </div> */}

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
