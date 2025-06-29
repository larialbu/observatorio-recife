"use client";

import React, { useEffect, useState } from "react";

import { IpcaGeralHeaders } from "@/@types/observatorio/@fetch/ipca";
import { ChartBuild } from "@/@types/observatorio/shared";
import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processBrasilVariacaoMensal } from "@/functions/process_data/observatorio/ipca/geral/charts/ipcaBrasilPorMeses";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const IpcaPorMeses = ({
  data = [],
  nameKey = "mes",
  colors = ColorPalette.default,
  title = "Variação Mensal do IPCA no Brasil",
  months,
}: ChartBuild<IpcaGeralHeaders[]>) => {
  
  // Processamento inicial dos dados
  const chartData = processBrasilVariacaoMensal(data);

  // Atualização dos dados com base nos meses fornecidos
  const updatedData = updatedMonthChartData(chartData, months ?? 1);

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={updatedData}
          title={title}
          colors={colors.slice(2)}
          xKey={nameKey}
          lines={[
            { dataKey: "variaçãoMensal", name: "Variação Mensal (%)", strokeWidth: 2 },
          ]}
        />
      </ChartGrabber>
    </div>
  );
};

export default IpcaPorMeses;