"use client";

import React from "react";

import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";
import { ChartBuild } from "@/@types/observatorio/shared";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processPassageirosPorAeroporto } from "@/functions/process_data/observatorio/aeroporto/geral/charts/passageirosPorAeroporto";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const PassageirosPorAeroporto = ({
  rawData = [],
  title = "Passageiros por Aeroporto",
}: ChartBuild<AnacGeralHeaders[]>) => {
  
  const chartData = processPassageirosPorAeroporto(rawData);

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="aeroporto"
          left={10}
          bars={[{ dataKey: "total", name: "Passageiros" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
        />
      </ChartGrabber>
    </div>
  );
};

export default PassageirosPorAeroporto;
