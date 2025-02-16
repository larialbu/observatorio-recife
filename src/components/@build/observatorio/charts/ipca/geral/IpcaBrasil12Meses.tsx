"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processIpcaBrasilUltimos12Meses } from "@/functions/process_data/observatorio/ipca/geral/charts/ipcaBrasilUltimos12Meses";

const IpcaBrasil12Meses = ({
  data = [],
  nameKey = "capital",
  colors = ColorPalette.default,
  title = "IPCA Acumulado nos últimos 12 meses no Brasil",
}: any) => {
  
  // Processamento inicial dos dados
  const chartData = processIpcaBrasilUltimos12Meses(data);

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