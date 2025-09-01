"use client";

import React from "react";

import { ChartBuild } from "@/@types/observatorio/shared";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processRawAccumulator } from "@/functions/process_data/observatorio/aeroporto/geral/charts/rawAccumulator";

type RawDataType = Record<string, Record<string, Record<string, number>>>;

const CargaPorAeroporto = ({
  rawData = {},
  title = "Carga por Aeroporto",
  colors = ColorPalette.default,
}: ChartBuild<RawDataType>) => {

  const chartData = processRawAccumulator(rawData, 'AEROPORTO NOME', 'CARGA')

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="label"
          left={10}
          bars={[{ dataKey: "value", name: "Carga (kg)" }]}
          height={400} // Altura do viewport visível para scroll
          heightPerCategory={50}
        />
      </ChartGrabber>
    </div>
  );
};

export default CargaPorAeroporto;
