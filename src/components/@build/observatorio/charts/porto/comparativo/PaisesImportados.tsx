"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getPortoCountryNameByCode } from "@/utils/formatters/getPortoCountryNameByCode";
import { processCargasLongoCurso } from "@/functions/process_data/observatorio/porto/operacao/charts/paisesImportados";

const PaisesImportados = ({
  data,
  porto,
  title = "Passageiros por Aeroporto",
  year,
}: any) => {

  // console.log('DATA Q ESTÀ SENDO PASSADO GRAFICO 3', data)

  const chartData = getPortoCountryNameByCode(processCargasLongoCurso(data.atracacao.filter((a: any) => a["Porto Atracação"] === porto), data.carga, 'importacao'), data.dictionaries.origem, 'Origem')

//   const chartData = processAtracacoesPorCarga(data.atracacao, data.carga)
  // console.log('CAHARTDATA -0-0-0-0--', chartData)

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

export default PaisesImportados;
