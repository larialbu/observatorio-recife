"use client";

import React, { useEffect, useState } from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processPassageirosAno } from "@/functions/process_data/observatorio/aeroporto/geral/charts/passageirosAno";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import { processCargaAnoAena } from "@/functions/process_data/observatorio/aeroporto/aena/cargasAnoAena";

const CargasAnoAena = ({
    data,
    colors = ColorPalette.default,
    title = "Passageiros ao Longo do Ano",
  }: any) => {
 
console.log(data)

    const chartData = processCargaAnoAena(data);
  
console.log(chartData)

    return (
      <div className="relative bg-white w-full p-4">
        <ChartGrabber>
          <LineChart
            data={chartData}
            title={title}
            colors={colors}
            xKey="mes"
            lines={[{ dataKey: "quantidade", name: "Cargas (ton)", strokeWidth: 2 }]}
          />
        </ChartGrabber>
      </div>
    );
  };
  
  
  

export default CargasAnoAena;
