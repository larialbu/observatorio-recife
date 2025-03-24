"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processIpcaNoAno } from "@/functions/process_data/observatorio/ipca/geral/charts/ipcaNoAno";
import { processPercentageByType } from "@/functions/process_data/observatorio/ipca/grupos/charts/participacaoGrupo";

const SubitemParticipacaoIpca = ({
  data = [],
  nameKey = "item",
  colors = ColorPalette.default,
  title = "IPCA Subitem",
}: any) => {
  
  const chartData = processPercentageByType(data, 'item');
  console.log(chartData)

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          colors={colors.slice(2)}
          xKey={nameKey}
          widthY={100}
          left={15}
          bars={[{ dataKey: "porcentagem", name: "Participação do Subitem no IPCA (%)", barWidth: 30 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default SubitemParticipacaoIpca;