"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getPortoCountryNameByCode } from "@/utils/formatters/getPortoCountryNameByCode";
import { processCargasLongoCurso } from "@/functions/process_data/observatorio/porto/operacao/charts/paisesImportados";

const PaisesExportados = ({
  data,
  title = "Passageiros por Aeroporto",
  year,
}: any) => {

  const chartData = getPortoCountryNameByCode(processCargasLongoCurso(data.atracacao, data.carga, 'exportacao'), data.dictionaries.destino, 'Destino')

  return (
    <div className="chart-wrapper">
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
