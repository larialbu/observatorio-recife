"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { getDateKeys } from "@/utils/formatters/getDataKeys";
import { processDecolagensAnoComparativo } from "@/functions/process_data/observatorio/aeroporto/comparativo/decolagensAnoComparativo";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";

const DecolagensAnoComparativo = ({
  data = [],
  colors = ColorPalette.default,
  title = "Decolagens ao Longo do Ano",
  toCompare,
  months
}: any) => {
  const chartData = processDecolagensAnoComparativo(data, toCompare);

  const updatedData = updatedMonthChartData(chartData, months);
  
  return (
    <div className="relative bg-white w-full p-4">
      <ChartGrabber>
        <LineChart
          data={updatedData}
          title={title}
          colors={colors}
          xKey="mes"
          lines={[...getDateKeys(toCompare)]}
        />
      </ChartGrabber>
    </div>
  );
};

export default DecolagensAnoComparativo;
