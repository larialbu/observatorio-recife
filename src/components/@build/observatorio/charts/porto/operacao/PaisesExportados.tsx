"use client";

import React from "react";

import { PortoGeralData } from "@/@types/observatorio/@data/portoData";
import { ChartBuild } from "@/@types/observatorio/shared";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { getObjToArr } from "@/utils/formatters/getObjToArr";

const PaisesExportados = ({
  data,
  title = "Passageiros por Aeroporto",
}: ChartBuild<PortoGeralData>) => {

  const dataAccumulated = data?.['accumulated'] || {}

  const rawData = dataAccumulated?.['País Destino'] || {};

  const filteredData: Record<string, number> = {};

  Object.entries(rawData).forEach(([key, val]) => {
    if (typeof val === 'number') {
      filteredData[key] = val;
    }
  });

  const chartData = getObjToArr<number>(filteredData).sort((a, b) => b.value - a.value);

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="label"
          bars={[{ dataKey: "value", name: "Carga (Ton)" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
        />
      </ChartGrabber>
    </div>
  );
};

export default PaisesExportados;
