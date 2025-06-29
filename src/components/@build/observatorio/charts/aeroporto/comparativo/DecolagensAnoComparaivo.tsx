"use client";

import React from "react";

import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";
import { ChartBuild } from "@/@types/observatorio/shared";
import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processDecolagensAnoComparativo } from "@/functions/process_data/observatorio/aeroporto/comparativo/decolagensAnoComparativo";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import { getDateKeys } from "@/utils/formatters/getDataKeys";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const DecolagensAnoComparativo = ({
  data,
  colors = ColorPalette.default,
  title = "Decolagens ao Longo do Ano",
  toCompare,
  months
}: ChartBuild<AnacGeralHeaders[]>) => {
  const chartData = processDecolagensAnoComparativo(data, toCompare ?? []);

  const updatedData = updatedMonthChartData(chartData, months ?? 1);
  
  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={updatedData}
          title={title}
          colors={colors}
          xKey="mes"
          lines={[...getDateKeys(toCompare ?? [])]}
        />
      </ChartGrabber>
    </div>
  );
};

export default DecolagensAnoComparativo;
