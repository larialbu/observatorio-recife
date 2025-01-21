"use client";

import React, { useEffect, useState } from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processBrasilVariacaoMensal } from "@/functions/process_data/observatorio/ipca/geral/charts/ipcaBrasilPorMeses";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";

const IpcaPorMeses = ({
  data = [],
  nameKey = "mes",
  colors = ColorPalette.default,
  title = "Variação Mensal do IPCA no Brasil",
  months,
}: any) => {
  
  // Processamento inicial dos dados
  const chartData = processBrasilVariacaoMensal(data);

  // Atualização dos dados com base nos meses fornecidos
  const updatedData = updatedMonthChartData(chartData, months);

  return (
    <div className="relative bg-white w-full p-4">
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