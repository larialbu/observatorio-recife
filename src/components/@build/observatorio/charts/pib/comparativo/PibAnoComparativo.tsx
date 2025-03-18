"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { getDateKeys } from "@/utils/formatters/getDataKeys";
import { processPIBPorAnoComparativo } from "@/functions/process_data/observatorio/pib/comparativo/pibAnoComparativo";

const PibAnoComparativo = ({
  data = [],
  colors = ColorPalette.default,
  title = "PIB ao Longo do Ano",
  toCompare,
}: any) => {

  const chartData = processPIBPorAnoComparativo(data.geral, toCompare)

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="mes"
          lines={[...getDateKeys(toCompare)]}
        />
      </ChartGrabber>
    </div>
  );
};

export default PibAnoComparativo;
