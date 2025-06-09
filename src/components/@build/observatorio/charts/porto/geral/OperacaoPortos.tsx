"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processCargasPorPorto } from "@/functions/process_data/observatorio/porto/geral/charts/operacaoPorPorto";
import { ChartBuild } from "@/@types/observatorio/shared";
import { PortoGeralData } from "@/@types/observatorio/@data/portoData";
 
const OperacaoPortos = ({
  data,
  months,
  title = "Operação Portos (Ton)",
}: ChartBuild<PortoGeralData>) => {
  const dataCoords =  data?.coords?.[0] || []

  const monthsToRead = months?.selected.length ? months.selected : months.options

  const dataToRead = dataCoords.filter((data) => monthsToRead.includes(`${data.Mes}`)) || []

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
