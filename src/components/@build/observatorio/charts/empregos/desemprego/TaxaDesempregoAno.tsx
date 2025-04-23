"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import { monthShortName } from "@/utils/formatters/@global/monthShortName";

const TaxaDesempregoAno = ({
  data,
  nameKey = "Trimestre",
  colors = ColorPalette.default,
  title = "Demissões/Admissões ao Longo do Ano",
  months,
}: any) => {
  
  const chartData = data['municipios'].sort((a: any, b: any) => {+a["Trimestre"].split('º')[0] - +b["Trimestre"].split('º')[0]}).map((data: any) => ({ ...data, "Trimestre": data['Trimestre'].split(' ')[0]}));

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          colors={colors}
          xKey={nameKey}
          lines={[{ dataKey: "Taxa", name: "Taxa", strokeWidth: 2 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default TaxaDesempregoAno;
