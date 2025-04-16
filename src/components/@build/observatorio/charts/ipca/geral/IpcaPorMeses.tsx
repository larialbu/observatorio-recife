"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processVariacaoMensal } from "@/functions/process_data/observatorio/ipca/geral/charts/ipcaPorMeses";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import { ChartBuild } from "@/@types/observatorio/shared";
import { IpcaGeralHeaders } from "@/@types/observatorio/@fetch/ipca";


const IpcaPorMeses = ({
  data = [],
  months,
  colors = ColorPalette.default,
  title = "Variação Mensal do IPCA",
  nameKey = "mes",
}: ChartBuild<IpcaGeralHeaders[]>) => {

  const chartData = processVariacaoMensal(data);

  const categorias = Object.keys(chartData[0] || {}).filter(key => key !== 'mes');

  const updatedData = updatedMonthChartData(chartData, months as any);

  const selectedColors = categorias.map((_, index) => colors[index % colors.length]);

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={updatedData}
          title={title}
          colors={selectedColors}
          xKey={nameKey}
          lines={categorias.map((categoria) => ({
            dataKey: categoria,
            name: categoria,
            strokeWidth: 2,
          }))}
        />
      </ChartGrabber>
    </div>
  );
};

export default IpcaPorMeses;
