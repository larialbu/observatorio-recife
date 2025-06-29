"use client";

import React from "react";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processPIBvariacaoComparativo } from "@/functions/process_data/observatorio/pib/comparativo/pibAnoVariacaoComparativo";
import { getDateKeys } from "@/utils/formatters/getDataKeys";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const PibAnoVariacaoComparativo = ({
  data = [],
  colors = ColorPalette.default,
  title = "PIB Variação ao Longo do Ano",
  toCompare,
}: any) => {

  const chartData = processPIBvariacaoComparativo(data.geral, toCompare)

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="ano"
          lines={[...getDateKeys(toCompare)]}
        />
      </ChartGrabber>
    </div>
  );
};

export default PibAnoVariacaoComparativo;
