"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { getDateKeys } from "@/utils/formatters/getDataKeys";
import { processCargasAnoComparativo } from "@/functions/process_data/observatorio/aeroporto/comparativo/cargasAnoComparativo";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import { ChartBuild } from "@/@types/observatorio/shared";
import { AnacGeralData } from "@/@types/observatorio/@data/aeroportoData";
import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

const CargasAnoComparativo = ({
  data = [],
  colors = ColorPalette.default,
  title = "Cargas ao Longo do Ano",
  toCompare,
  months
}: ChartBuild<AnacGeralHeaders[]>) => {
  const chartData = processCargasAnoComparativo(data, toCompare ?? []);
  console.log('ChartData ->', chartData)

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

export default CargasAnoComparativo;
