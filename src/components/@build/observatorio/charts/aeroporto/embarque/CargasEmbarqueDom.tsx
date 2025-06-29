"use client";

import React from "react";

import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";
import { ChartBuild } from "@/@types/observatorio/shared";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processEmbarqueDesembarqueNaturezaTipo } from "@/functions/process_data/observatorio/aeroporto/embarque/embarqueDesembarqueNaturezaTipo";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const CargasEmbarqueDom = ({
  data,
  toCompare = ["Recife"],
  title = "Doméstico Cargas (ton)",
  colors = ColorPalette.default,
  monthRecent,
  subText = 'UF Destino',
  type
}: ChartBuild<AnacGeralHeaders[]>) => {

  const chartData = processEmbarqueDesembarqueNaturezaTipo(
    data,
    toCompare,
    "Doméstica",
    "cargas", 
    type ?? "Embarque",
    monthRecent
  );

  return (
    <div className="chart-wrapper ">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={`${type} ${title}`}
          colors={colors}
          xKey="uf"
          bars={[{ dataKey: 'total', name: "Cargas (Ton)" }]}
          height={400} // Altura do viewport visível para scroll
          barSize={30} // Altura individual de cada barra
        />
        <div className="absolute -rotate-90 top-[50%] -left-6">
          {subText && (
            <p
              className="font-medium"
              style={{ color: colors[6] }} // Aplica a cor dinamicamente
            >
              {subText}
            </p>
          )}
        </div>
      </ChartGrabber>
    </div>
  );
};

export default CargasEmbarqueDom;
