"use client";

import React from "react";
import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processDecolagensPorAeroporto } from "@/functions/process_data/observatorio/aeroporto/geral/charts/decolagemPorAeroporto";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { ChartBuild } from "@/@types/observatorio/shared";
import { AnacGeralData } from "@/@types/observatorio/@data/aeroportoData";

const DecolagensPorAeroporto = ({
  rawData,
  title = "Decolagens por Aeroporto",
  colors = ColorPalette.default,
}: ChartBuild<AnacGeralData>) => {

  const chartData = processDecolagensPorAeroporto(rawData ?? {
    filteredData: [],
    additionalFiltersOptions: [],
    rawDataPassageiros: [],
  });

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          xKey="aeroporto"
          left={10}
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
