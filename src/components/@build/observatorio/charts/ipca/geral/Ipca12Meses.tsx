"use client";

import React from "react";

import { IpcaGeralHeaders } from "@/@types/observatorio/@fetch/ipca";
import { ChartBuild } from "@/@types/observatorio/shared";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processIpcaUltimos12Meses } from "@/functions/process_data/observatorio/ipca/geral/charts/ipcaUltimos12Meses";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const IpcaAcumuladoPorCapital = ({
  rawData = [],
  nameKey = "capital",
  colors = ColorPalette.default,
  title = "IPCA Acumulado nos últimos 12 meses por Capital",
}: ChartBuild<IpcaGeralHeaders[]>) => {
  
  const chartData = processIpcaUltimos12Meses(rawData);

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          colors={colors}
          xKey={nameKey}
          widthY={100}
          left={5}
          bars={[{ dataKey: "acumuladoUltimosMeses", name: "Acumulado Últimos 12 meses (%)", barWidth: 30 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default IpcaAcumuladoPorCapital;