"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getPortoCountryNameByCode } from "@/utils/formatters/getPortoCountryNameByCode";
import { processCargasLongoCurso } from "@/functions/process_data/observatorio/porto/operacao/charts/paisesImportados";

const PaisesExportados = ({
  data,
  porto,
  title = "Passageiros por Aeroporto",
  year,
}: any) => {

  console.log('PORTO SELECIONADO', porto)
  console.log('ATRA FILTR', data.atracacao.filter((a: any) => a["Porto Atracação"] === porto))
  console.log('DATA Q ESTÀ SENDO PASSADO GRAFICO 2', data)
  console.log('DDAO MERDA ', processCargasLongoCurso(data.atracacao.filter((a: any) => a["Porto Atracação"] === porto), data.carga, 'exportacao'))

  const chartData = getPortoCountryNameByCode(processCargasLongoCurso(data.atracacao.filter((a: any) => a["Porto Atracação"] === porto), data.carga, 'exportacao'), data.dictionaries.destino, 'Destino')

  console.log('CAHARTDATA -0-0-0-0--Expo', chartData)

  return (
    <div className="relative bg-white w-full p-4">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="pais"
          bars={[{ dataKey: "totalVLPesoCargaBruta", name: "Carga (Ton)" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
        />
      </ChartGrabber>
    </div>
  );
};

export default PaisesExportados;
