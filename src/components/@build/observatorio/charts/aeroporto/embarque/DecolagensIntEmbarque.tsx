"use client";

import React from "react";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import HorizontalScrollableBarChart from "@/components/@global/charts/HorizontalScrollableBarChart";
import { embarqueDesembarqueNatureTipo } from "@/functions/process_data/observatorio/aeroporto/embarque/embarqueDesembarqueNaturezaTipo";

const DecolagensIntEmbarque = ({
  data = [],
  toCompare = ["Recife"],
  title = "Internacional Decolagens",
  colors = ColorPalette.default,
  monthRecent,
  subText = 'País Destino',
  type
}: any) => {
  // Assumimos que o filtro de dados (ano, etc.) já foi aplicado antes de passar para o componente.
  const chartData = embarqueDesembarqueNatureTipo(
    data,
    toCompare,
    'Internacional',
    "decolagens",
    type,
    monthRecent
  );

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <HorizontalScrollableBarChart
          data={chartData}
          title={`${type} ${title}`}
          colors={[colors[1]]}
          xKey="uf"
          bars={[{ dataKey: "total", name: "Decolagens" }]}
          height={400} // Altura do viewport visível para scroll
          barSize={30} // Altura individual de cada barra
          widthMultiply={130}
          heightToPass={285}
        />
        <div className="w-full flex justify-center mt-4">
          {subText && (
            <p
              className="font-medium"
              style={{ color: colors[1] }} // Aplica a cor dinamicamente
            >
              {subText}
            </p>
          )}
        </div>
      </ChartGrabber>
    </div>
  );
};

export default DecolagensIntEmbarque;
