"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processPercentageByType } from "@/functions/process_data/observatorio/ipca/grupos/charts/participacaoGrupo";
import { ChartBuild } from "@/@types/observatorio/shared";
import { IpcaGrupoHeaders } from "@/@types/observatorio/@fetch/ipca";

const GrupoParticipacaoIpca = ({
  data = [],
  nameKey = "grupo",
  colors = ColorPalette.default,
  title = "IPCA Grupo",
}: ChartBuild<IpcaGrupoHeaders[]>) => {
  
  const chartData = processPercentageByType(data, 'grupo');

  return (
    <div className="chart-wrapper">
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