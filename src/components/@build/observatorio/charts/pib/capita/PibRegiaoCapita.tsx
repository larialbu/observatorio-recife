"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processPibGroup } from "@/functions/process_data/observatorio/pib/geral/pibGroup";

const PibRegiaoCapita = ({
  data,
  title = "PIB por Região",
}: any) => {
    
  const chartData =  processPibGroup(data.rawDataCurrent, 'regiao', true)

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="group"
          bars={[{ dataKey: "pib", name: "PIB Região" }]}
          colors={[ColorPalette.default[1]]}
          heightPerCategory={50}
        />
      </ChartGrabber>
    </div>
  );
};

export default PibRegiaoCapita;
