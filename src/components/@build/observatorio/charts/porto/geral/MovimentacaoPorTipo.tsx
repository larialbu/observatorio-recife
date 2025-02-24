"use client";

import React, { useState } from "react";
import PieChart from "@/components/@global/charts/PieChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { ShowPercentages } from "@/components/@global/features/ShowPercentages";
import { preparePassageirosPorNaturezaData } from "@/functions/process_data/observatorio/aeroporto/geral/charts/passageirosPorNatureza";
import { prepareCargasPorAcaoData } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoPorAcao";

const MovimentacaoPorTipo = ({
  data,
  title = "Tipo de Transação (Ton)",
  year,
}: any) => {
  const [showPercentage, setShowPercentage] = useState(true);
  const chartData = prepareCargasPorAcaoData(data.atracacao, data.carga, false)

console.log('CAHHHHHHHAHAA', chartData)

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <PieChart
          data={chartData}
          title={title}
          underTitle={
            <ShowPercentages
              showPercentage={showPercentage}
              setShowPercentage={setShowPercentage}
            />
          }
          dataKey="totalPeso"
          nameKey="acao"
          colors={ColorPalette.default}
          showPercentages={showPercentage}
          tooltipEntry=""
        />
      </ChartGrabber>
    </div>
  );
};

export default MovimentacaoPorTipo;
