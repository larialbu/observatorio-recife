"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import { monthShortName } from "@/utils/formatters/@global/monthShortName";

const DesligamentosAno = ({
  data = [],
  colors = ColorPalette.default,
  title = "Desligamentos no ano",
}: any) => {

  const chartData = getObjToArr<number>(data["Mês Desligamento"] || {}).sort((a, b) => +a.label - +b.label).map((item) => ({ ...item, label: monthShortName(+item.label) }))

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="label"
          lines={[
            { dataKey: "value", name: "Desligamentos", strokeWidth: 2 },
          ]}
        />
      </ChartGrabber>
    </div>
  );
};

export default DesligamentosAno;
