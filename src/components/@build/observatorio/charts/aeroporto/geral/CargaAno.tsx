"use client";

import React from "react";

import { ChartBuild } from "@/@types/observatorio/shared";
import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processRawAccumulator } from "@/functions/process_data/observatorio/aeroporto/geral/charts/rawAccumulator";

type RawDataType = Record<string, Record<string, Record<string, number>>>;

const CargaAno = ({
  data = {},
  colors = ColorPalette.default,
  title = "Carga Total ao Longo do Ano",
}: ChartBuild<RawDataType>) => {
  
  const chartData = processRawAccumulator(data, 'MÊS', 'CARGA')

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          colors={colors}
          xKey='label'
          lines={[{ dataKey: "value", name: "Carga (kg)", strokeWidth: 2 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default CargaAno;
