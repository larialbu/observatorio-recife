"use client";

import React from "react";

import { ChartBuild } from "@/@types/observatorio/shared";
import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";


const RankingMunicipio = ({
  data = [],
  months,
  colors = ColorPalette.default,
  title = "Ranking do Município (geral)",
  nameKey = "label",
}: ChartBuild<any>) => {
// }: ChartBuild<IpcaGeralHeaders[]>) => {

  const ranking = data?.data?.['ranking'] || []

  const chartData = ranking.map((item: any) => ({
    label: item['Ano'],
    value: item['Colocação'],
  })).sort((a: any, b: any) => +a.label - +b.label);

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          colors={colors}
          yAxis={{ reversed: true }}
          xKey={nameKey}
          lines={[{ dataKey: "value", name: "Colocação", strokeWidth: 2 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default RankingMunicipio;
