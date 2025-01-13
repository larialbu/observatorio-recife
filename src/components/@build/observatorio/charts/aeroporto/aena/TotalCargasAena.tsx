"use client";

import React from "react";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processCargaPorAeroporto } from "@/functions/process_data/observatorio/aeroporto/geral/charts/cargaPorAeroporto";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processPassageirosPorAeroportoAena } from "@/functions/process_data/observatorio/aeroporto/aena/totalPassageirosAeroporto";
import { processCargasPorAeroportoAena } from "@/functions/process_data/observatorio/aeroporto/aena/totalCargasAeroporto";

const TotalCargasAena = ({
  data = [],
  title = "Carga por Aeroporto",
  colors = ColorPalette.default,
}: any) => {
  // Assumimos que o filtro de dados (ano, etc.) já foi aplicado antes de passar para o componente.
  const chartData = processCargasPorAeroportoAena(data);
console.log('cargas',chartData)

  return (
    <div className="relative bg-white w-full p-4">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="aeroporto"
          bars={[{ dataKey: "totalCarga", name: "Passageiros" }]}
          height={400} // Altura do viewport visível para scroll
          heightPerCategory={50}
        />
      </ChartGrabber>
    </div>
  );
};

export default TotalCargasAena;
