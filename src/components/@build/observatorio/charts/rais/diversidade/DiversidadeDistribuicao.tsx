"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import { raisGrupoDicts } from "@/utils/dicts/rais/raisGrupoDicts";

const DiversidadeDistribuicao = ({
  data,
  title = "Distribuição formal de empregos por grupo de empresas (necessidades especiais)",
  year,
}: any) => {
  
  const chartData = getObjToArr<number>(data['grupo'] || {}).sort((a, b) => b.value - a.value).map((item) => ({...item, label: raisGrupoDicts[item.label] }))

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="label"
          bars={[{ dataKey: "value", name: "Quantidade" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
          widthY={130}
          left={-15}
        />
      </ChartGrabber>
    </div>
  );
};

export default DiversidadeDistribuicao;
