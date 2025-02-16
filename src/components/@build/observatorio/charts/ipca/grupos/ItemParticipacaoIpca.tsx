"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processPercentageByType } from "@/functions/process_data/observatorio/ipca/grupos/charts/participacaoGrupo";

const ItemParticipacaoIpca = ({
  data = [],
  nameKey = "item",
  colors = ColorPalette.default,
  title = "IPCA Item",
}: any) => {
  
  const chartData = processPercentageByType(data, 'item');

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          colors={colors.slice(1)}
          xKey={nameKey}
          bars={[{ dataKey: "porcentagem", name: "Participação do Item no IPCA (%)", barWidth: 30 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default ItemParticipacaoIpca;