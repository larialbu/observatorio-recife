"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import { processAtracacoesPorMes } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoPorMes";

const CargasAno = ({
  data = [],
  colors = ColorPalette.default,
  title = "Movimentação de Cargas (Ton)",
  months
}: any) => {
  const chartData = processAtracacoesPorMes(data.atracacao, data.carga)

  const updatedData = updatedMonthChartData(chartData, months?.options.length);

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={updatedData}
          title={title}
          colors={colors}
          xKey="mes"
          lines={[
            { dataKey: "totalVLPesoCargaBruta", name: "Carga (Ton)", strokeWidth: 2 },
          ]}
        />
      </ChartGrabber>
    </div>
  );
};

export default CargasAno;
