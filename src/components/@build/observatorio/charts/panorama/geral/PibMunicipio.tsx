"use client";

import React from "react";

import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processPibGroup } from "@/functions/process_data/observatorio/pib/geral/pibGroup";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const PibMunicipio = ({
  data,
  title = "PIB por Município",
}: any) => {
  const pib = data?.data?.['pib'] || []

  console.log('PIIB data ->', data, pib)
  
  const chartData =  processPibGroup(pib, 'municipio')

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          xKey="group"
          bars={[{ dataKey: "pib", name: "PIB Município" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
        />
      </ChartGrabber>
    </div>
  );
};

export default PibMunicipio;
