"use client";

import React from "react";
import VerticalScrollableBarChart from "@/components/@global/charts/ScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processCargaPorAeroporto } from "@/functions/process_data/observatorio/aeroporto/cargaPorAeroporto";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { embarqueNaturezaTipo } from "@/functions/process_data/observatorio/aeroporto/embarque/embarqueNaturezaTipo";

const PassageirosEmbarqueDom = ({
  data = [],
  toCompare = ["Recife"],
  title = "Carga por Aeroporto",
  colors = ColorPalette.default,
  monthRecent,
}: any) => {
  // Assumimos que o filtro de dados (ano, etc.) já foi aplicado antes de passar para o componente.
  const chartData = embarqueNaturezaTipo(
    data,
    toCompare,
    "Doméstica",
    "passageiros",
    monthRecent
  );

  // console.log("---->> ->>", chartData);

  return (
    <div className="relative bg-white w-full p-4">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="uf"
          bars={[{ dataKey: "total", name: "Carga (kg)" }]}
          height={400} // Altura do viewport visível para scroll
          barSize={30} // Altura individual de cada barra
        />
      </ChartGrabber>
    </div>
  );
};

export default PassageirosEmbarqueDom;
