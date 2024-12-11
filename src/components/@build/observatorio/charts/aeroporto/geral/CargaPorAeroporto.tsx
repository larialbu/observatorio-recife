"use client";

import React from "react";
import { processCargaPorAeroporto } from "@/utils/process_data/observatorio/aeroporto/cargaPorAeroporto";
import VerticalScrollableBarChart from "@/components/@global/charts/ScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const CargaPorAeroporto = ({
  data = [],
  year,
  title = "Carga por Aeroporto",
  colors = ColorPalette.default,
}: any) => {
  const chartData = processCargaPorAeroporto(data, year);

  return (
    <div className="relative bg-white w-full p-4">
      <VerticalScrollableBarChart
        data={chartData}
        title={title}
        colors={colors}
        xKey="aeroporto"
        bars={[{ dataKey: "totalCarga", name: "Carga (kg)" }]}
        height={400} // Altura do viewport
        barSize={30} // Tamanho das barras
      />
    </div>
  );
};

export default CargaPorAeroporto;
