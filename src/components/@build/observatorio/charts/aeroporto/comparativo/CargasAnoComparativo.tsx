"use client";

import React, { useEffect, useState } from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { getDateKeys } from "@/utils/formatters/getDataKeys";
import { processCargasAnoComparativo } from "@/functions/process_data/observatorio/aeroporto/comparativo/cargasAnoComparativo";

const CargasAnoComparativo = ({
  data = [],
  colors = ColorPalette.default,
  title = "Cargas ao Longo do Ano",
  toCompare = ["Recife"],
}: any) => {
  const chartData = processCargasAnoComparativo(data, toCompare);
  console.log(chartData);
  console.log(toCompare);
  console.log(getDateKeys(toCompare));

  return (
    <div className="relative bg-white w-full p-4">
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

export default CargasAnoComparativo;
