"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import { monthToNumber } from "@/utils/formatters/@global/monthToNumber";

const ComparativoSaldo = ({
  data = [],
  colors = ColorPalette.default,
  title = "Saldo no ano",
  toCompare,
}: any) => {
  
  const dataCompare = data?.[toCompare]

  const dataAdmitidos = dataCompare?.['admitidos'] || []
  const dataDemitidos = dataCompare?.['demitidos'] || []

  const dataNoOrdanation = []

  for (const key in dataAdmitidos) {
    dataNoOrdanation.push({ label: key, value: dataAdmitidos[key] - dataDemitidos[key] })
  }

  const chartData = dataNoOrdanation.map((data) => ({ ...data, month: monthToNumber(data.label) })).sort((a, b) => a.month - b.month)

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

export default ComparativoSaldo;