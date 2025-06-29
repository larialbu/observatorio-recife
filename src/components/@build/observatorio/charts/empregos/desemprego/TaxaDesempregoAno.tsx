"use client";

import React from "react";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processDesempregoTaxaAno } from "@/functions/process_data/observatorio/empregos/desemprego/desempregoTaxaAno";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import { monthShortName } from "@/utils/formatters/@global/monthShortName";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const TaxaDesempregoAno = ({
  data,
  nameKey = "label",
  colors = ColorPalette.default,
  title = "Demissões/Admissões ao Longo do Ano",
  months,
}: any) => {
  
  const chartData = processDesempregoTaxaAno(data['municipios'])
  
  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          colors={colors}
          xKey={nameKey}
          lines={[{ dataKey: "value", name: "Taxa", strokeWidth: 2 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default TaxaDesempregoAno;
