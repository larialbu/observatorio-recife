"use client";

import React from "react";
import VerticalScrollableBarChart from "@/components/@global/charts/ScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processCargaPorAeroporto } from "@/functions/process_data/observatorio/aeroporto/geral/cargaPorAeroporto";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { embarqueNaturezaTipo } from "@/functions/process_data/observatorio/aeroporto/embarque/embarqueNaturezaTipo";
import { embarqueDesembarqueNatureTipo } from "@/functions/process_data/observatorio/aeroporto/embarque/embarqueDesembarqueNaturezaTipo";

const CargasEmbarqueDom = ({
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
    "Doméstica",
    "cargas", 
    type,
    monthRecent
  );

  return (
    <div className="relative bg-white w-full p-4">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={`${type} Doméstico Cargas (ton)`}
          colors={colors}
          xKey="uf"
          bars={[{ dataKey: 'total', name: "Cargas (Ton)" }]}
          height={400} // Altura do viewport visível para scroll
          barSize={30} // Altura individual de cada barra
        />
      </ChartGrabber>
    </div>
  );
};

export default CargasEmbarqueDom;
