"use client";

import React from "react";

import { IpcaGeralHeaders } from "@/@types/observatorio/@fetch/ipca";
import { ChartBuild } from "@/@types/observatorio/shared";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processIpcaBrasilUltimos12Meses } from "@/functions/process_data/observatorio/ipca/geral/charts/ipcaBrasilUltimos12Meses";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const IpcaBrasil12Meses = ({
  rawData = [],
  nameKey = "capital",
  colors = ColorPalette.default,
  title = "IPCA Acumulado nos últimos 12 meses no Brasil",
}: ChartBuild<IpcaGeralHeaders[]>) => {
  
  const chartData = processIpcaBrasilUltimos12Meses(rawData);

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          colors={colors.slice(2)}
          xKey={nameKey}
          bars={[{ dataKey: "acumuladoUltimosMeses", name: "Acumulado Últimos 12 meses (%)", barWidth: 30 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default IpcaBrasil12Meses;