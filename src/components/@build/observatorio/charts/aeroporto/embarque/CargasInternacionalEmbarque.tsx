"use client";

import React from "react";

import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";
import { ChartBuild } from "@/@types/observatorio/shared";
import HorizontalScrollableBarChart from "@/components/@global/charts/HorizontalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processEmbarqueDesembarqueNaturezaTipo } from "@/functions/process_data/observatorio/aeroporto/embarque/embarqueDesembarqueNaturezaTipo";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const CargasIntEmbarque = ({
  data,
  toCompare = ["Recife"],
  title = "Internacional Cargas (ton)",
  colors = ColorPalette.default,
  monthRecent,
  subText = 'País Destino',
  type
}: ChartBuild<AnacGeralHeaders[]>) => {

  const chartData = processEmbarqueDesembarqueNaturezaTipo(
    data,
    toCompare,
    'Internacional',
    "cargas",
    type ?? "Embarque",
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
          bars={[{ dataKey: "total", name: "Cargas (Ton)" }]}
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

export default CargasIntEmbarque;
