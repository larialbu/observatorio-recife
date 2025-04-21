"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processCargaAno } from "@/functions/process_data/observatorio/aeroporto/geral/charts/cargaAno";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import { ChartBuild } from "@/@types/observatorio/shared";
import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

const RelatorioAno = ({
  data,
  nameKey = "Mês",
  colors = ColorPalette.default,
  title = "Carga Total ao Longo do Ano",
  months,
}: ChartBuild<AnacGeralHeaders[]>) => {
  
  const chartData = data['municipios'].sort((a, b) => a["Mês"] - b["Mês"]);

//   console.log('CHAR', chartData, data)

  const updatedData = chartData
  // const updatedData = updatedMonthChartData(chartData, months ?? 1);

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={updatedData}
          title={title}
          colors={colors}
          xKey={nameKey}
          lines={[{ dataKey: "Admissões", name: "Admissões", strokeWidth: 2 }, { dataKey: "Demissões", name: "Demissões", strokeWidth: 2 }, { dataKey: "Saldos", name: "Saldo", strokeWidth: 2 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default RelatorioAno;
