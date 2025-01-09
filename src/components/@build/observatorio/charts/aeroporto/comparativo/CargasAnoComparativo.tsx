"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { getDateKeys } from "@/utils/formatters/getDataKeys";
import { processCargasAnoComparativo } from "@/functions/process_data/observatorio/aeroporto/comparativo/cargasAnoComparativo";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";

const CargasAnoComparativo = ({
  data = [],
  colors = ColorPalette.default,
  title = "Cargas ao Longo do Ano",
  toCompare,
  months
}: any) => {
  const chartData = processCargasAnoComparativo(data, toCompare);

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

export default CargasAnoComparativo;
