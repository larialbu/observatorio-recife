"use client";

import React, { useEffect, useState } from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processPassageirosAno } from "@/functions/process_data/observatorio/aeroporto/passageirosAno";
import { processPassageirosAnoComparativo } from "@/functions/process_data/observatorio/aeroporto/comparativo/passageirosAnoComparativo";
import { getDateKeys } from "@/utils/formatters/getDataKeys";

const PassageirosAnoComparativo = ({
  data = [],
  colors = ColorPalette.default,
  title = "Passageiros ao Longo do Ano",
  toCompare = ["Recife"],
}: any) => {
  const chartData = processPassageirosAnoComparativo(data, toCompare);

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

export default PassageirosAnoComparativo;
