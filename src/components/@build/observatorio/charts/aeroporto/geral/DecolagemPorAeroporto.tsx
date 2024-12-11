"use client";

import React from "react";
import VerticalScrollableBarChart from "@/components/@global/charts/ScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processDecolagensPorAeroporto } from "@/functions/process_data/observatorio/aeroporto/decolagemPorAeroporto";

const DecolagensPorAeroporto = ({
  data = [],
  year,
  title = "Decolagens por Aeroporto",
  colors = ColorPalette.default,
}: any) => {
  const chartData = processDecolagensPorAeroporto(data, year);

  return (
    <div className="relative bg-white w-full p-4">
      <VerticalScrollableBarChart
        data={chartData}
        title={title}
        xKey="aeroporto"
        bars={[{ dataKey: "totalDecolagens", name: "Decolagens" }]}
        colors={colors}
        heightPerCategory={60} // Ajusta a altura por categoria para melhor visibilidade
        visibleHeight={400} // Altura visível do gráfico
      />
    </div>
  );
};

export default DecolagensPorAeroporto;
