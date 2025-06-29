"use client";

import React from "react";

import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getAccGroups } from "@/functions/process_data/observatorio/micro-caged/getAccGroups";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const MovimentacaoSalario = ({
  data,
  title = "Movimentação por Faixa de Salário",
  year,
}: any) => {
  
  const chartData = getAccGroups(data['salário'],  [[0, 1500, 0], [1501, 3000, 0], [3001, 4500, 0], [4501, 6000, 0], [6001, 7500, 0], [7501, 9000, 0], [9001, 100000000000000, 0] ]).map((group) => {
    return { label: `R$ ${group[0]},00 ${ group[0] === 9001 ? 'ou mais' : `a ${group[1]},00`}`, value: group[2] }
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
          // widthY={90}
          left={-15}
        />
      </ChartGrabber>
    </div>
  );
};

export default MovimentacaoSalario;
