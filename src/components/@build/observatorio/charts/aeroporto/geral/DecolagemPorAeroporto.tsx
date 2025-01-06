"use client";

import React from "react";
import VerticalScrollableBarChart from "@/components/@global/charts/ScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processDecolagensPorAeroporto } from "@/functions/process_data/observatorio/aeroporto/geral/decolagemPorAeroporto";
import ChartGrabber from "@/components/@global/features/ChartGrabber";

const DecolagensPorAeroporto = ({
  data = [],
  title = "Decolagens por Aeroporto",
  colors = ColorPalette.default,
}: any) => {
  // O filtro por ano já deve ser feito fora do componente
  const chartData = processDecolagensPorAeroporto(data);

  return (
    <div className="relative bg-white w-full p-4">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          xKey="aeroporto"
          bars={[{ dataKey: "totalDecolagens", name: "Decolagens" }]}
          colors={colors}
          heightPerCategory={50} // Define a altura de cada barra
          visibleHeight={400} // Define a altura visível para scroll
        />
      </ChartGrabber>
    </div>
  );
};

export default DecolagensPorAeroporto;
