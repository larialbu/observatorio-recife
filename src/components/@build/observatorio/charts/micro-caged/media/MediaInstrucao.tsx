"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import { getAvarageGroups } from "@/functions/process_data/observatorio/micro-caged/getAvarageGroups";

const MediaInstrucao = ({
  data,
  title = "Salário Médio por Grau de Instrução",
  year,
}: any) => {
  const quantity = data?.['quantity'] || {}
  const values = data?.['values'] || {}
  
  const avarageData = getAvarageGroups(values, quantity)['graudeinstrução'] || {}

  const chartData = getObjToArr<number>(avarageData || {}).sort((a, b) => b.value - a.value)

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

export default MediaInstrucao;
