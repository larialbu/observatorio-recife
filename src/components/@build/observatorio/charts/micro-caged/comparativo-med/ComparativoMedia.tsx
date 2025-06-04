"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { getDateKeys } from "@/utils/formatters/getDataKeys";
import { monthToNumber } from "@/utils/formatters/@global/monthToNumber";
import { processMunicipiosMonthValues } from "@/functions/process_data/observatorio/micro-caged/comparativo-med/municipiosMonthValues";

const ComparativoMedia = ({
  data = [],
  colors = ColorPalette.default,
  title = "Salário Médio",
  toCompare,
}: any) => {

  const dataCurrent = data['current']

  const dataMunicipios = processMunicipiosMonthValues(dataCurrent, toCompare)

  const chartData = dataMunicipios.map((data) => ({ ...data, order: monthToNumber(data['mes']) })).sort((a, b) => a.order - b.order)

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="mes"
          lines={[...getDateKeys(toCompare ?? [])]}
        />
      </ChartGrabber>
    </div>
  );
};

export default ComparativoMedia;
