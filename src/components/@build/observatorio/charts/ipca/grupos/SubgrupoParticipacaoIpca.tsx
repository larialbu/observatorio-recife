"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processIpcaNoAno } from "@/functions/process_data/observatorio/ipca/geral/charts/ipcaNoAno";
import { processPercentageByType } from "@/functions/process_data/observatorio/ipca/grupos/charts/participacaoGrupo";

const SubgrupoParticipacaoIpca = ({
  data = [],
  nameKey = "subgrupo",
  colors = ColorPalette.default,
  title = "IPCA Subgrupo",
}: any) => {
  
  const chartData = processPercentageByType(data, 'subgrupo');

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          colors={colors.slice(2)}
          xKey={nameKey}
          bars={[{ dataKey: "porcentagem", name: "Participação do Subgrupo no IPCA (%)", barWidth: 30 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default SubgrupoParticipacaoIpca;