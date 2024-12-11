"use client";

import React, { useEffect, useState } from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processPassageirosAno } from "@/functions/process_data/observatorio/aeroporto/passageirosAno";

const PassageirosAno = ({
  data = [],
  nameKey = "MÊS",
  colors = ColorPalette.default,
  title = "Passageiros ao Longo do Ano",
  year,
}: any) => {
  const chartData = processPassageirosAno(data, year, "RECIFE");
  console.log(chartData);

  return (
    <div className="relative bg-white w-full p-4">
      <ChartGrabber>
        <LineChart
          data={chartData}
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
