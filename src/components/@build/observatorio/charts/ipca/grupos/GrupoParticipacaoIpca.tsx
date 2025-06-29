"use client";

import React from "react";

import { IpcaGrupoHeaders } from "@/@types/observatorio/@fetch/ipca";
import { ChartBuild } from "@/@types/observatorio/shared";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processPercentageByType } from "@/functions/process_data/observatorio/ipca/grupos/charts/participacaoGrupo";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const GrupoParticipacaoIpca = ({
  data = [],
  nameKey = "label",
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
          bars={[{ dataKey: "value", name: "Participação do Grupo no IPCA (%)", barWidth: 30 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default GrupoParticipacaoIpca;