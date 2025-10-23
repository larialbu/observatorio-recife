"use client";

import React from "react";

import { ChartBuild } from "@/@types/observatorio/shared";
import BarChart from "@/components/@global/charts/BarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const BalancaComercial = ({
  data,
  title = "Balança Comercial (Exportação / Importação)",
  colors = ColorPalette.default,
}: ChartBuild<any>) => {
// }: ChartBuild<AnacChartData>) => {

  const anac = data?.data?.['balanca'] || []

  const result = anac.reduce((acc: Record<string, number>, obj: Record<string, number>) => {
    if (!acc[obj['tipo']]) acc[obj['tipo']] = 0 

    acc[obj['tipo']] += obj?.['Valor US$'] || 0

    return acc
  }, {
    
  })

  const chartData = Object.keys(result).map((key) => ({ label: key, value: result[key] }))

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <BarChart
          data={chartData}
          title={`${title}`}
          colors={[colors[1], colors[0]]}
          xKey="label"
          bars={[{ dataKey: "value", name: "USD" }]}
          height={300} // Altura do viewport visível para scroll
          barSize={30} // Altura individual de cada barra
          widthMultiply={130}
          heightToPass={285}
        />
      </ChartGrabber>
    </div>
  );
};

export default BalancaComercial;
