"use client";
import React from "react";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processEmbarqueDesembarqueNaturezaTipo } from "@/functions/process_data/observatorio/aeroporto/embarque/embarqueDesembarqueNaturezaTipo";
import { ChartBuild } from "@/@types/observatorio/shared";
import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

const DecolagensEmbarqueDom = ({
  data,
  toCompare = ["Recife"],
  title = "Doméstico Decolagens",
  colors = ColorPalette.default,
  monthRecent,
  subText = 'UF Destino',
  type
}: ChartBuild<AnacGeralHeaders[]>) => {

  const chartData = processEmbarqueDesembarqueNaturezaTipo(
    data,
    toCompare,
    "Doméstica",
    "decolagens",
    type ?? "Embarque",
    monthRecent
  );

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={`${type} ${title}`}
          colors={colors}
          xKey="uf"
          bars={[{ dataKey: "total", name: "Decolagens" }]}
          height={400} // Altura do viewport visível para scroll
          barSize={30} // Altura individual de cada barra
        />
        {/* Renderiza o subText dentro do ChartGrabber */}
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

export default DecolagensEmbarqueDom;