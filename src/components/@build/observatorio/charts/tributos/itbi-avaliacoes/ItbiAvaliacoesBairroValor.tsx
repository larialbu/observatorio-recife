"use client";

import React from "react";

import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processItbiMediana } from "@/functions/process_data/observatorio/tributos/itbi-avaliacoes/itibiMesMediana";

const ItbiAvaliacoesBairroValor = ({
  data,
  title = "Mediana Valor por Bairro",
  year,
}: any) => {
    const dataRawData = data?.['tributos']?.['bairro'] || {}
    
    const chartData = processItbiMediana(dataRawData);
  
  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="label"
          bars={[{ dataKey: "value", name: "Valor" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
          widthY={130}
          left={-15}
        />
      </ChartGrabber>
    </div>
  );
};

export default ItbiAvaliacoesBairroValor;
