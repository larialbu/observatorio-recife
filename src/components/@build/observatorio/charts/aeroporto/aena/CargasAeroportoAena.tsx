"use client";

import React from "react";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processCargasPorAeroportoAena } from "@/functions/process_data/observatorio/aeroporto/aena/totalCargasAeroporto";
import { ChartBuild } from "@/@types/observatorio/shared";
import { AenaCargasData } from "@/@types/observatorio/@data/aeroportoData";

const TotalCargasAena = ({
  rawData,
  title = "Cargas por Aeroporto",
  colors = ColorPalette.default,
}: ChartBuild<AenaCargasData>) => {

  const chartData = processCargasPorAeroportoAena(rawData 
    ?? {
      filteredData: [],
      additionalFiltersOptions: [],
      rawDataCargas: [],
    }
  );

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="aeroporto"
          bars={[{ dataKey: "totalCarga", name: "Cargas (ton)" }]}
          height={400} // Altura do viewport visível para scroll
          heightPerCategory={100}
        />
      </ChartGrabber>
    </div>
  );
};

export default TotalCargasAena;
