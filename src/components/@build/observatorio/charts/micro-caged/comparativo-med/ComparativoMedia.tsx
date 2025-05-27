"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { getDateKeys } from "@/utils/formatters/getDataKeys";
import { processPIBPorAnoComparativo } from "@/functions/process_data/observatorio/pib/comparativo/pibAnoComparativo";
import { monthToNumber } from "@/utils/formatters/@global/monthToNumber";

const ComparativoMedia = ({
  data = [],
  colors = ColorPalette.default,
  title = "ComparativoMedia",
  toCompare,
}: any) => {

  const dataFull: any[] = []

  for (const keyMuni in data) {
    if (toCompare.includes(keyMuni)) {
        for (const keyMonth in data[keyMuni]) {
            const dataMonthIndex = dataFull.findIndex((obj: any) => obj['mes'] === keyMonth )

            if (dataMonthIndex === -1) {
                dataFull.push({ mes: keyMonth, [keyMuni]: data[keyMuni][keyMonth] })
            } else {
                dataFull[dataMonthIndex] = { ...dataFull[dataMonthIndex], [keyMuni]: data[keyMuni][keyMonth] }
            }
        }
    }
  }

  const chartData = dataFull.map((data) => ({ ...data, order: monthToNumber(data['mes']) })).sort((a, b) => a.order - b.order)

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
