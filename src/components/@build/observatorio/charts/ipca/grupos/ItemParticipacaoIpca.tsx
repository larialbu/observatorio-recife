"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processPercentageByType } from "@/functions/process_data/observatorio/ipca/grupos/charts/participacaoGrupo";
import { IpcaGrupoHeaders } from "@/@types/observatorio/@fetch/ipca";
import { ChartBuild } from "@/@types/observatorio/shared";

const ItemParticipacaoIpca = ({
  data = [],
  nameKey = "label",
  colors = ColorPalette.default,
  title = "IPCA Item",
}: ChartBuild<IpcaGrupoHeaders[]>) => {
  
  const chartData = processPercentageByType(data, 'item');

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          colors={colors.slice(1)}
          xKey={nameKey}
          widthY={100}
          left={15}
          bars={[{ dataKey: "value", name: "Participação do Item no IPCA (%)", barWidth: 30 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default ItemParticipacaoIpca;