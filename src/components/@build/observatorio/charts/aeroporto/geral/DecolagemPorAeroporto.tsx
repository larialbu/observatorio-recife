"use client";

import React from "react";

import { ChartBuild } from "@/@types/observatorio/shared";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processRawAccumulator } from "@/functions/process_data/observatorio/aeroporto/geral/charts/rawAccumulator";
import { AnacChartData } from "@/@types/observatorio/@fetch/aeroporto";


const DecolagensPorAeroporto = ({
  data,
  title = "Decolagens por Aeroporto",
  colors = ColorPalette.default,
}: ChartBuild<AnacChartData>) => {

  const chartData = processRawAccumulator(data?.rawData?.["AEROPORTO NOME"] || {}, 'AEROPORTO NOME', 'DECOLAGENS')

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          xKey="label"
          left={10}
          bars={[{ dataKey: "value", name: "Decolagens" }]}
          colors={colors}
          heightPerCategory={50} // Define a altura de cada barra
          visibleheight={300} // Define a altura visível para scroll
        />
      </ChartGrabber>
    </div>
  );
};

export default DecolagensPorAeroporto;
