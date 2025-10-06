"use client";

import React from "react";

import { ChartBuild } from "@/@types/observatorio/shared";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processRawAccumulator } from "@/functions/process_data/observatorio/aeroporto/geral/charts/rawAccumulator";
import { AnacChartData } from "@/@types/observatorio/@fetch/aeroporto";


const PassageirosPorAeroporto = ({
  data,
  title = "Passageiros por Aeroporto",
}: ChartBuild<AnacChartData>) => {
  
  const chartData = processRawAccumulator(data?.rawData?.["AEROPORTO NOME"] || {}, 'AEROPORTO NOME', 'PASSAGEIRO')

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="label"
          left={10}
          bars={[{ dataKey: "value", name: "Passageiros" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
        />
      </ChartGrabber>
    </div>
  );
};

export default PassageirosPorAeroporto;
