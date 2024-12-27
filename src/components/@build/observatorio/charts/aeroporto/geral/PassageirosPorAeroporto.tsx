"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/ScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { preparePassageirosPorAeroportoData } from "@/functions/process_data/observatorio/aeroporto/passageirosPorAeroporto";
import ChartGrabber from "@/components/@global/features/ChartGrabber";

const PassageirosPorAeroporto = ({
  data,
  title = "Passageiros por Aeroporto",
  year,
}: any) => {
  const chartData = preparePassageirosPorAeroportoData(data);

  return (
    <div className="relative bg-white w-full p-4">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="aeroporto"
          bars={[{ dataKey: "total", name: "Passageiros" }]}
          colors={ColorPalette.default}
          height={500}
        />
      </ChartGrabber>
    </div>
  );
};

export default PassageirosPorAeroporto;
