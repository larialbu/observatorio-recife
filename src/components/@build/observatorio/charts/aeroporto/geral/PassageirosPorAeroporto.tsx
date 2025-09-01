"use client";

import React from "react";

import { ChartBuild } from "@/@types/observatorio/shared";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processRawAccumulator } from "@/functions/process_data/observatorio/aeroporto/geral/charts/rawAccumulator";

type RawDataType = Record<string, Record<string, Record<string, number>>>;

const PassageirosPorAeroporto = ({
  rawData = {},
  title = "Passageiros por Aeroporto",
}: ChartBuild<RawDataType>) => {
  
  const chartData = processRawAccumulator(rawData, 'AEROPORTO NOME', 'PASSAGEIRO')

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
