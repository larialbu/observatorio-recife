"use client";

import React from "react";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processPIBPorAno } from "@/functions/process_data/observatorio/pib/geral/pibAno";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const PibAno = ({
  data = [],
  colors = ColorPalette.default,
  title = "PIB ao Longo do Ano",
  months
}: any) => {

const chartData = processPIBPorAno(data.geral.flat())

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
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
