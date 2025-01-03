"use client";

import React from "react";
import VerticalScrollableBarChart from "@/components/@global/charts/ScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processCargaPorAeroporto } from "@/functions/process_data/observatorio/aeroporto/geral/cargaPorAeroporto";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { embarqueNaturezaTipo } from "@/functions/process_data/observatorio/aeroporto/embarque/embarqueNaturezaTipo";
import HorizontalScrollableBarChart from "@/components/@global/charts/HorizontalScrollaberBarChart";
import { embarqueDesembarqueNatureTipo } from "@/functions/process_data/observatorio/aeroporto/embarque/embarqueDesembarqueNaturezaTipo";

const PassageirosIntEmbarque = ({
  data = [],
  toCompare = ["Recife"],
  title = "Carga por Aeroporto",
  colors = ColorPalette.default,
  monthRecent,
  type
}: any) => {
  // Assumimos que o filtro de dados (ano, etc.) já foi aplicado antes de passar para o componente.
  const chartData = embarqueDesembarqueNatureTipo(
    data,
    toCompare,
    'Internacional',
    'passageiros',
    type,
    monthRecent
  );

  return (
    <div className="relative bg-white w-full p-4">
      <ChartGrabber>
        <HorizontalScrollableBarChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="uf"
          bars={[{ dataKey: "total", name: "Carga (kg)" }]}
          height={400} // Altura do viewport visível para scroll
          barSize={30} // Altura individual de cada barra
          widthMultiply={130}
          heightToPass={285}
        />
      </ChartGrabber>
    </div>
  );
};

export default PassageirosIntEmbarque;
