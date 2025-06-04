"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { getDateKeys } from "@/utils/formatters/getDataKeys";
import { processPIBPorAnoComparativo } from "@/functions/process_data/observatorio/pib/comparativo/pibAnoComparativo";

const ComparativoMovimentacao = ({
  data = [],
  colors = ColorPalette.default,
  title = "Admissões e Admissões no Ano",
  toCompare,
}: any) => {

  const dataCompare = data?.[toCompare]

  const dataAdmitidos = dataCompare?.['admitidos'] || []
  const dataDemitidos = dataCompare?.['demitidos'] || []

  const chartData = []

  for (const key in dataAdmitidos) {
    chartData.push({ admitidos: dataAdmitidos[key], demitidos: dataDemitidos[key] })
  }

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="ano"
          lines={[{ dataKey: "admitidos", name: "Admitidos", strokeWidth: 2 }, { dataKey: "demitidos", name: "Demitidos", strokeWidth: 2 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default ComparativoMovimentacao;
