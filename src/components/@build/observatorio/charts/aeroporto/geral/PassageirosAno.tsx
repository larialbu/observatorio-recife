"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processPassageirosAno } from "@/functions/process_data/observatorio/aeroporto/geral/charts/passageirosAno";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";

const PassageirosAno = ({
  data = [],
  colors = ColorPalette.default,
  title = "Passageiros ao Longo do Ano",
  months
}: any) => {
  const chartData = processPassageirosAno(data);

  const updatedData = updatedMonthChartData(chartData, months);

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={updatedData}
          title={title}
          colors={colors}
          xKey="mes"
          lines={[
            { dataKey: "passageiros", name: "Passageiros", strokeWidth: 2 },
          ]}
        />
      </ChartGrabber>
    </div>
  );
};

export default PassageirosAno;
