"use client";

import React, { useState } from "react";
import PieChart from "@/components/@global/charts/PieChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { ShowPercentages } from "@/components/@global/features/ShowPercentages";
import { preparePassageirosPorClassificacaoData } from "@/functions/process_data/observatorio/aeroporto/aena/passageirosPorClassificacaoAena";
import { ChartBuild } from "@/@types/observatorio/shared";
import { AenaPassageirosHeaders } from "@/@types/observatorio/@fetch/aeroporto";

const PassageirosPorClassificacaoAena = ({
  data = [],
  title = "Passageiros por classificação da viagem",
}: ChartBuild<AenaPassageirosHeaders[]>) => {
  const [showPercentage, setShowPercentage] = useState(true);
  
  const chartData = preparePassageirosPorClassificacaoData(data);

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
          dataKey="total"
          nameKey="classificação"
          colors={ColorPalette.default}
          showPercentages={showPercentage}
          tooltipEntry=""
        />
      </ChartGrabber>
    </div>
  );
};

export default PassageirosPorClassificacaoAena;
