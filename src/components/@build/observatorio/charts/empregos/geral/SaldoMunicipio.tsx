"use client";

import React from "react";

import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processGroupsValues } from "@/functions/process_data/observatorio/empregos/caged/cagedGroupsValues";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const SaldoMunicipio = ({
  data,
  title = "Saldo por Município",
  year,
}: any) => {
  
  const chartData = processGroupsValues(data['caged'], "Municipio")

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

export default SaldoMunicipio;
