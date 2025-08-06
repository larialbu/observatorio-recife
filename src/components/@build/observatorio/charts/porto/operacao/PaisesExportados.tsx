"use client";

import React from "react";

import { PortoGeralData } from "@/@types/observatorio/@data/portoData";
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
  title = "Passageiros por Aeroporto",
}: ChartBuild<PortoGeralData>) => {

  const dataAccumulated = data?.['accumulated'] || {}

  const chartData = getPortoCountryNameByCode(getObjToArr<number>(dataAccumulated?.['Destino'] || {}), data.dictionaries.destino, 'Destino')
  // const chartData = getPortoCountryNameByCode(processCargasLongoCurso(data.atracacao as PortoAtracacaoHeaders[], data.carga, 'exportacao') as any, data.dictionaries.destino, 'Destino')


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
