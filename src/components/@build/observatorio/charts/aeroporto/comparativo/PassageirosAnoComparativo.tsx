"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processPassageirosAnoComparativo } from "@/functions/process_data/observatorio/aeroporto/comparativo/passageirosAnoComparativo";
import { getDateKeys } from "@/utils/formatters/getDataKeys";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import { ChartBuild } from "@/@types/observatorio/shared";
import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

const PassageirosAnoComparativo = ({
  data,
  colors = ColorPalette.default,
  title = "Passageiros ao Longo do Ano",
  toCompare,
  months
}: ChartBuild<AnacGeralHeaders[]>) => {
  const chartData = processPassageirosAnoComparativo(data, toCompare ?? []);

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

export default PassageirosAnoComparativo;
