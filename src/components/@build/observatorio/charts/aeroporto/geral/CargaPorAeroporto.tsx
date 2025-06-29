"use client";

import React from "react";

import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";
import { ChartBuild } from "@/@types/observatorio/shared";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processCargaPorAeroporto } from "@/functions/process_data/observatorio/aeroporto/geral/charts/cargaPorAeroporto";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const CargaPorAeroporto = ({
  rawData = [],
  title = "Carga por Aeroporto",
  colors = ColorPalette.default,
}: ChartBuild<AnacGeralHeaders[]>) => {

  const chartData = processCargaPorAeroporto(rawData);

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="aeroporto"
          left={10}
          bars={[{ dataKey: "totalCarga", name: "Carga (kg)" }]}
          height={400} // Altura do viewport visível para scroll
          heightPerCategory={50}
        />
      </ChartGrabber>
    </div>
  );
};

export default CargaPorAeroporto;
