"use client";

import React from "react";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processMunicipiosMonthValues } from "@/functions/process_data/observatorio/micro-caged/comparativo-med/municipiosMonthValues";
import { monthToNumber } from "@/utils/formatters/@global/monthToNumber";
import { getDateKeys } from "@/utils/formatters/getDataKeys";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

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
