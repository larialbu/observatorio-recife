"use client";

import React from "react";

import { IpcaGeralHeaders } from "@/@types/observatorio/@fetch/ipca";
import { ChartBuild } from "@/@types/observatorio/shared";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processIpcaBrasilNoAno } from "@/functions/process_data/observatorio/ipca/geral/charts/ipcaBrasilNoAno";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const IpcaAcumuladoPorCapital = ({
  rawData = [],
  nameKey = "capital",
  colors = ColorPalette.default,
  title = "IPCA Acumulado ao Ano no Brasil",
}: ChartBuild<IpcaGeralHeaders[]>) => {
  
  // Processamento inicial dos dados
  const chartData = processIpcaBrasilNoAno(rawData);

  return (
    <div className="chart-wrapper">
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