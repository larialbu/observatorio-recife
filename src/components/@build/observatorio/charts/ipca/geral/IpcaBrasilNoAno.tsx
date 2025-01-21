"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processIpcaBrasilNoAno } from "@/functions/process_data/observatorio/ipca/geral/charts/ipcaBrasilNoAno";

const IpcaAcumuladoPorCapital = ({
  data = [],
  nameKey = "capital",
  colors = ColorPalette.default,
  title = "IPCA Acumulado ao Ano no Brasil",
}: any) => {
  
  // Processamento inicial dos dados
  const chartData = processIpcaBrasilNoAno(data);

  return (
    <div className="relative bg-white w-full p-4">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          colors={colors.slice(2)}
          xKey={nameKey}
          bars={[{ dataKey: "acumuladoAno", name: "Acumulado no Ano (%)", barWidth: 30 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default IpcaAcumuladoPorCapital;