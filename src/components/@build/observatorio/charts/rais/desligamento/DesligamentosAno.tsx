"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import { processAtracacoesPorMes } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoPorMes";
import { getObjToArr } from "@/utils/formatters/getObjToArr";

const CargasAno = ({
  data = [],
  colors = ColorPalette.default,
  title = "Movimentação de Cargas (Ton)",
  months
}: any) => {
//   const chartData = processAtracacoesPorMes(data.atracacao, data.carga)
  const chartData = getObjToArr<number>(data["Mês Desligamento"] || {}).sort((a, b) => +a.label - +b.label)

//   const updatedData = updatedMonthChartData(chartData, months?.options.length);

//   console.log('UPDADAa', updatedData)

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={chartData}
        //   data={updatedData}
          title={title}
          colors={colors}
          xKey="label"
          lines={[
            { dataKey: "value", name: "Desligamentos", strokeWidth: 2 },
          ]}
        />
      </ChartGrabber>
    </div>
  );
};

export default CargasAno;
