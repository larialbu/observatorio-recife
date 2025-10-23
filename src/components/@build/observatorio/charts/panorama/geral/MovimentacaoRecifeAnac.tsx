"use client";

import React from "react";

import { ChartBuild } from "@/@types/observatorio/shared";
import BarChart from "@/components/@global/charts/BarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const MovimentacaoRecifeAnac = ({
  data,
  title = "Decolagens",
  colors = ColorPalette.default,
}: ChartBuild<any>) => {
// }: ChartBuild<AnacChartData>) => {

  const anac = data?.data?.['anac'] || []

  const result = anac.reduce((acc: Record<string, number>, obj: Record<string, number>) => {
    acc['carga'] += obj?.['CARGA'] || 0
    acc['passageiros'] += obj?.['PASSAGEIRO'] || 0

    return acc
  }, {
    carga: 0, 
    passageiros: 0
  })

  const chartData = [{ label: 'Cargas', value: result['carga'] }, { label: 'Passageiros', value: result['passageiros'] }]

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <BarChart
          data={chartData}
          title={`${title}`}
          colors={[colors[1]]}
          xKey="label"
          bars={[{ dataKey: "value", name: "Quantidade" }]}
          height={300} // Altura do viewport visível para scroll
          barSize={30} // Altura individual de cada barra
          widthMultiply={130}
          heightToPass={285}
        />
      </ChartGrabber>
    </div>
  );
};

export default MovimentacaoRecifeAnac;
