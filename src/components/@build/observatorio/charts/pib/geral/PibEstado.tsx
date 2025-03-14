"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processPibGroup } from "@/functions/process_data/observatorio/pib/geral/pibGroup";

const PibEstado = ({
  data,
  title = "PIB por Estado",
}: any) => {
    
  const chartData =  processPibGroup(data.rawDataCurrent, 'estado')

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="group"
          bars={[{ dataKey: "pib", name: "PIB Estado" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
        />
      </ChartGrabber>
    </div>
  );
};

export default PibEstado;
