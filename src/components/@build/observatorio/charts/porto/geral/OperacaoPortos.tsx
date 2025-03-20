"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processAtracacoesPorCarga } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoProdutos";
import { getPortoProductNameByCode } from "@/utils/formatters/getPortoProductNameByCode";
import { processCargasPorPorto } from "@/functions/process_data/observatorio/porto/geral/charts/opecaoPorPorto";

const OperacaoPortos = ({
  data,
  months,
  title = "Operação Portos (Ton)",
  year,
}: any) => {
  const dataCoords =  data?.coords?.[0] || []

  const monthsToRead = months?.selected.length ? months.selected : months.options

  const dataToRead = dataCoords.filter((data: any) => monthsToRead.includes(parseInt(data.Mes))) || []

  const chartData = processCargasPorPorto(dataToRead)

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="porto"
          bars={[{ dataKey: "carga", name: "Porto (Ton)" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
          widthY={150}
        />
      </ChartGrabber>
    </div>
  );
};

export default OperacaoPortos;
