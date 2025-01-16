"use client";

import React from "react";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processCargaPorAeroporto } from "@/functions/process_data/observatorio/aeroporto/geral/charts/cargaPorAeroporto";
import ChartGrabber from "@/components/@global/features/ChartGrabber";

const CargaPorAeroporto = ({
  data = [],
  title = "Carga por Aeroporto",
  colors = ColorPalette.default,
}: any) => {
  // Assumimos que o filtro de dados (ano, etc.) já foi aplicado antes de passar para o componente.
  const chartData = processCargaPorAeroporto(data);

  return (
    <div className="relative bg-white w-full p-4">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="aeroporto"
          bars={[{ dataKey: "totalCarga", name: "Carga (kg)" }]}
          height={400} // Altura do viewport visível para scroll
          heightPerCategory={50}
        />
      </ChartGrabber>
    </div>
  );
};

export default CargaPorAeroporto;
