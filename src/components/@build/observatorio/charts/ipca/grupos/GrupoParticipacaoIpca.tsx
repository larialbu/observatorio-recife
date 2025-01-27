"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processPercentageByType } from "@/functions/process_data/observatorio/ipca/grupos/charts/participacaoGrupo";

const GrupoParticipacaoIpca = ({
  data = [],
  nameKey = "grupo",
  colors = ColorPalette.default,
  title = "IPCA Grupo",
}: any) => {
  
  const chartData = processPercentageByType(data, 'grupo');

  return (
    <div className="relative bg-white w-full p-4">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          colors={colors.slice(1)}
          xKey={nameKey}
          bars={[{ dataKey: "porcentagem", name: "Participação do Grupo no IPCA (%)", barWidth: 30 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default GrupoParticipacaoIpca;