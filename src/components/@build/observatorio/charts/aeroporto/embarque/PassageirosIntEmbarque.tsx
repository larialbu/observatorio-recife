"use client";
import React from "react";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import HorizontalScrollableBarChart from "@/components/@global/charts/HorizontalScrollableBarChart";
import { processEmbarqueDesembarqueNaturezaTipo } from "@/functions/process_data/observatorio/aeroporto/embarque/embarqueDesembarqueNaturezaTipo";
import { ChartBuild } from "@/@types/observatorio/shared";
import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

const PassageirosIntEmbarque = ({
  data,
  toCompare = ["Recife"],
  title = "Internacional Passageiros",
  colors = ColorPalette.default,
  monthRecent,
  subText = 'País Destino',
  type
}: ChartBuild<AnacGeralHeaders[]>) => {

  const chartData = processEmbarqueDesembarqueNaturezaTipo(
    data,
    toCompare,
    'Internacional',
    'passageiros',
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
          bars={[{ dataKey: "total", name: "Passageiros" }]}
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

export default PassageirosIntEmbarque;