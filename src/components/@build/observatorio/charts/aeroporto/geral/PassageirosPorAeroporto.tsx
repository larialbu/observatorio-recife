"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processPassageirosPorAeroporto } from "@/functions/process_data/observatorio/aeroporto/geral/charts/passageirosPorAeroporto";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { ChartBuild } from "@/@types/observatorio/shared";
import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

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
