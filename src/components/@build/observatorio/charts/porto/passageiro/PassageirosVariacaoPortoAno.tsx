"use client";

import React from "react";

import { PortoPassageirosOutputData } from "@/@types/observatorio/@data/portoData";
import { ChartBuild } from "@/@types/observatorio/shared";
import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processPassageirosAnoPorto } from "@/functions/process_data/observatorio/porto/passageiro/charts/passageirosAnoPorto";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const PassageirosVariacaoPortoAno = ({
  data,
  colors = ColorPalette.default,
  title = "Variação de Passageiros no Ano",
  months
}: ChartBuild<PortoPassageirosOutputData>) => {
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
            { dataKey: "variation", name: `${yearCur} - ${yearPast}`, strokeWidth: 2 },
          ]}
        />
      </ChartGrabber>
    </div>
  );
};

export default PassageirosVariacaoPortoAno;
