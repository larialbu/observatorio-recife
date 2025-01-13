"use client";

import React, { useEffect, useState } from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processPassageirosAno } from "@/functions/process_data/observatorio/aeroporto/geral/charts/passageirosAno";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import { processPassageirosAnoAena } from "@/functions/process_data/observatorio/aeroporto/aena/passageirosAnoAena";

const PassageirosAnoAena = ({
   data,
    colors = ColorPalette.default,
    title = "Passageiros ao Longo do Ano",
  }: any) => {
 
    const chartData = processPassageirosAnoAena(data);

    return (
      <div className="relative bg-white w-full p-4">
        <ChartGrabber>
          <LineChart
            data={chartData}
            title={title}
            colors={colors}
            xKey="mes"
            lines={[{ dataKey: "passageiros", name: "Passageiros", strokeWidth: 2 }]}
          />
        </ChartGrabber>
      </div>
    );
  };
  
  
  

export default PassageirosAnoAena;
