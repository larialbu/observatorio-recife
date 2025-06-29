"use client";

import React, { MutableRefObject, useEffect, useRef, useState } from "react";

import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getAccGroups } from "@/functions/process_data/observatorio/micro-caged/getAccGroups";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const MovimentacaoHoras = ({
  data,
  title = "Saldo por Horas Semanais",
  year,
}: any) => {

  const chartData = getAccGroups(data["horascontratuais"], [
    [0, 20, 0],
    [20, 30, 0],
    [30, 40, 0],
    [40, 44, 0],
    [44, 120, 0],
  ])
    .map((group) => ({
      label: `${group[0]}H ${
        group[0] === 44 ? "ou mais" : `a ${group[1]}H`
      }`,
      value: group[2],
    }))
    .sort((a, b) => b.value - a.value);

 

  return (
    <div  className="chart-wrapper">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="label"
          bars={[{ dataKey: "value", name: "Quantidade" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
          widthY={130}
          left={-47}
        />
      </ChartGrabber>
    </div>
  );
};

export default MovimentacaoHoras;
