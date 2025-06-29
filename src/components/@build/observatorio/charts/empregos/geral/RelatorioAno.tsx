"use client";

import React from "react";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import { monthShortName } from "@/utils/formatters/@global/monthShortName";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const RelatorioAno = ({
  data,
  nameKey = "Mês",
  colors = ColorPalette.default,
  title = "Demissões/Admissões ao Longo do Ano",
  months,
}: any) => {
  
  const chartData = data['municipios'].sort((a: any, b: any) => a["Mês"] - b["Mês"]).map((data: any) => ({ ...data, "Mês": monthShortName(data['Mês'])}));

  const updatedData = updatedMonthChartData(chartData, months ?? 1);
  
  console.log('DataLine -.', chartData)

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={updatedData}
          title={title}
          colors={colors}
          xKey={nameKey}
          lines={[{ dataKey: "Admissões", name: "Admissões", strokeWidth: 2 }, { dataKey: "Demissões", name: "Demissões", strokeWidth: 2 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default RelatorioAno;
