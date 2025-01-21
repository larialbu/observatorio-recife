"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processVariacaoMensal } from "@/functions/process_data/observatorio/ipca/geral/charts/ipcaPorMeses";
import { getDateKeys } from "@/utils/formatters/getDataKeys";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";

interface IpcaPorMesesProps {
  data: any[];
  months: string[];
  colors?: string[];
  title?: string;
  nameKey?: string;
}

const IpcaPorMeses: React.FC<IpcaPorMesesProps> = ({
  data = [],
  months,
  colors = ColorPalette.default,
  title = "Variação Mensal do IPCA",
  nameKey = "mes",
}) => {
  // Processamento inicial dos dados
  const chartData = processVariacaoMensal(data);

  // Identifica as categorias presentes nos dados processados
  const categorias = Object.keys(chartData[0] || {}).filter(key => key !== 'mes');

  // Atualização dos dados com base nos meses fornecidos
  const updatedData = updatedMonthChartData(chartData, months as any);

  // Seleciona as cores para as categorias (limite de 5)
  const selectedColors = categorias.map((_, index) => colors[index % colors.length]);

  return (
    <div className="relative bg-white w-full p-4">
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
