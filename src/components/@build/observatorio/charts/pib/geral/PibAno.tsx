"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processPIBPorAno } from "@/functions/process_data/observatorio/pib/geral/pibAno";

const PibAno = ({
  id,
  data = [],
  colors = ColorPalette.default,
  title = "PIB ao Longo do Ano",
  months
}: any) => {

const chartData = processPIBPorAno(data.geral.flat())

  return (
    <div className="chart-wrapper">
      <ChartGrabber id={id}>
        <LineChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="ano"
          lines={[
            { dataKey: "valor", name: "PIB", strokeWidth: 2 },
          ]}
        />
      </ChartGrabber>
    </div>
  );
};

export default PibAno;
