"use client";

import React from "react";

import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";
import { ChartBuild } from "@/@types/observatorio/shared";
import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processCargaAno } from "@/functions/process_data/observatorio/aeroporto/geral/charts/cargaAno";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const CargaAno = ({
  data,
  nameKey = "mes",
  colors = ColorPalette.default,
  title = "Carga Total ao Longo do Ano",
  months,
}: ChartBuild<AnacGeralHeaders[]>) => {
  
  const chartData = processCargaAno(data);

  const updatedData = updatedMonthChartData(chartData, months ?? 1);

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={updatedData}
          title={title}
          colors={colors}
          xKey={nameKey}
          lines={[{ dataKey: "carga", name: "Carga (kg)", strokeWidth: 2 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default CargaAno;
