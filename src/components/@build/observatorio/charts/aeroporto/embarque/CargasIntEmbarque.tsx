"use client";

import React from "react";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import HorizontalScrollableBarChart from "@/components/@global/charts/HorizontalScrollableBarChart";
import { embarqueDesembarqueNatureTipo } from "@/functions/process_data/observatorio/aeroporto/embarque/embarqueDesembarqueNaturezaTipo";

const CargasIntEmbarque = ({
  data = [],
  toCompare = ["Recife"],
  title = "Internacional Cargas (ton)",
  colors = ColorPalette.default,
  monthRecent,
  type
}: any) => {
  // Assumimos que o filtro de dados (ano, etc.) já foi aplicado antes de passar para o componente.
  const chartData = embarqueDesembarqueNatureTipo(
    data,
    toCompare,
    'Internacional',
    "cargas",
    type,
    monthRecent
  );

  return (
    <div className="relative bg-white w-full p-4">
      <ChartGrabber>
        <HorizontalScrollableBarChart
          data={chartData}
          title={`${type} ${title}`}
          colors={[colors[1]]}
          xKey="uf"
          bars={[{ dataKey: "total", name: "Cargas (Ton)" }]}
          height={400} // Altura do viewport visível para scroll
          barSize={30} // Altura individual de cada barra
          widthMultiply={130}
          heightToPass={285}
        />
      </ChartGrabber>
    </div>
  );
};

export default CargasIntEmbarque;
