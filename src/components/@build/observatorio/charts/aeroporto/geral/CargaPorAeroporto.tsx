"use client";

import React from "react";

import { ChartBuild } from "@/@types/observatorio/shared";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processRawAccumulator } from "@/functions/process_data/observatorio/aeroporto/geral/charts/rawAccumulator";
import { AnacChartData } from "@/@types/observatorio/@fetch/aeroporto";


const CargaPorAeroporto = ({
  data,
  title = "Carga por Aeroporto",
  colors = ColorPalette.default,
}: ChartBuild<AnacChartData>) => {

  const chartData = processRawAccumulator(data?.rawData?.["AEROPORTO NOME"] || {}, 'AEROPORTO NOME', 'CARGA')

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
          height={300} // Altura do viewport visível para scroll
          heightPerCategory={50}
        />
      </ChartGrabber>
    </div>
  );
};

export default CargaPorAeroporto;
