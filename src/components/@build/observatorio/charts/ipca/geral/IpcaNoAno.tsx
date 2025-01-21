"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processIpcaNoAno } from "@/functions/process_data/observatorio/ipca/geral/charts/ipcaNoAno";

const IpcaAcumuladoPorCapital = ({
  data = [],
  nameKey = "capital",
  colors = ColorPalette.default,
  title = "IPCA Acumulado ao Ano por Capital",
}: any) => {
  
  // Processamento inicial dos dados
  const chartData = processIpcaNoAno(data);

  return (
    <div className="relative bg-white w-full p-4">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          colors={colors}
          xKey={nameKey}
          bars={[{ dataKey: "acumuladoAno", name: "Acumulado no Ano (%)", barWidth: 30 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default IpcaAcumuladoPorCapital;