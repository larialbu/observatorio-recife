"use client";

import React from "react";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processPassageirosPorAeroportoAena } from "@/functions/process_data/observatorio/aeroporto/aena/totalPassageirosAeroporto";
import { ChartBuild } from "@/@types/observatorio/shared";
import { AenaPassageirosHeaders } from "@/@types/observatorio/@fetch/aeroporto";

const TotalPassageirosAena = ({
  rawData = [],
  title = "Passageiros por Aeroporto",
  colors = ColorPalette.default,
}: ChartBuild<AenaPassageirosHeaders[]>) => {
  // Assumimos que o filtro de dados (ano, etc.) já foi aplicado antes de passar para o componente.
  const chartData = processPassageirosPorAeroportoAena(rawData);

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="aeroporto"
          bars={[{ dataKey: "totalPassageiros", name: "Passageiros" }]}
          height={400} // Altura do viewport visível para scroll
          heightPerCategory={100}
        />
      </ChartGrabber>
    </div>
  );
};

export default TotalPassageirosAena;
