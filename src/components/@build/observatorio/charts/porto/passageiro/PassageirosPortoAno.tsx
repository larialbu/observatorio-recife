"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import { processAtracacoesPorMes } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoPorMes";
import { processPassageirosAnoPorto } from "@/functions/process_data/observatorio/porto/passageiro/charts/passageirosAnoPorto";

const PassageirosPortoAno = ({
  data = [],
  colors = ColorPalette.default,
  title = "Passageiros Durante o Ano",
  months
}: any) => {
const yearCur = data.passageiros?.current[0]?.['Data'].split('-')[0] || 'Dado não encontrado'
const yearPast = data.passageiros?.past[0]?.['Data'].split('-')[0] || 'Dado não encontrado'

const chartData = processPassageirosAnoPorto(data.passageiros.current || [], data.passageiros.past || [])

  const updatedData = updatedMonthChartData(chartData, months);

  return (
    <div className="chart-wrapper col-span-full">
      <ChartGrabber>
        <LineChart
          data={updatedData}
          title={title}
          colors={colors}
          xKey="mes"
          lines={[
            { dataKey: "current", name: yearCur, strokeWidth: 2 },
            { dataKey: "past", name: yearPast, strokeWidth: 2 },
          ]}
        />
      </ChartGrabber>
    </div>
  );
};

export default PassageirosPortoAno;
