"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import { getAccGroups } from "@/functions/process_data/observatorio/micro-caged/getAccGroups";

const MovimentacaoEtaria = ({
  data,
  title = "Movimentação por Faixa Etária",
  year,
}: any) => {
  
  const chartData = getAccGroups(data['idade'],  [[10, 14, 0], [15, 17, 0], [18, 24, 0], [25, 29, 0], [30, 39, 0], [40, 49, 0], [50, 64, 0], [65, 120, 0]]).map((group) => {
    return { label: `${group[0]} ${ group[0] === 65 ? 'ou mais' : `a ${group[1]}`}`, value: group[2] }
  }).sort((a, b) => b.value - a.value)


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

export default MovimentacaoEtaria;