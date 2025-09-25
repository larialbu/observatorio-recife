"use client";

import React from "react";

import { PortoDataResult, PortoGeralData, RawDataPortos } from "@/@types/observatorio/@data/portoData";
import { PortoAtracacaoHeaders } from "@/@types/observatorio/@fetch/porto";
import { ChartBuild } from "@/@types/observatorio/shared";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processCargasLongoCurso } from "@/functions/process_data/observatorio/porto/operacao/charts/paisesImportados";
import { getPortoCountryNameByCode } from "@/utils/formatters/getPortoCountryNameByCode";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { getObjToArr } from "@/utils/formatters/getObjToArr";

const PaisesExportados = ({
  data,
  color = ColorPalette.default,
  porto,
  title = "Países Exportados"  + ` - ${porto}`,
}: ChartBuild<PortoGeralData>) => {

  const dataAccumulated = data?.['accumulated'] || {};

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
          colors={[color]}
          heightPerCategory={50}
        />
      </ChartGrabber>
    </div>
  );
};

export default PaisesExportados;
