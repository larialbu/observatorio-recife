"use client";

import React from "react";

import { PortoGeralData } from "@/@types/observatorio/@data/portoData";
import { PortoAtracacaoHeaders } from "@/@types/observatorio/@fetch/porto";
import { ChartBuild } from "@/@types/observatorio/shared";
import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processAtracacoesPorMes } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoPorMes";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const CargasAno = ({
  data,
  colors = ColorPalette.default,
  title = "Movimentação de Cargas (Ton)",
  months
}: ChartBuild<PortoGeralData>) => {
  const chartData = processAtracacoesPorMes(data.atracacao as PortoAtracacaoHeaders[], data.carga)

  const updatedData = updatedMonthChartData(chartData, months?.options.length);

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={updatedData}
          title={title}
          colors={colors}
          xKey="mes"
          lines={[
            { dataKey: "totalVLPesoCargaBruta", name: "Carga (Ton)", strokeWidth: 2 },
          ]}
        />
      </ChartGrabber>
    </div>
  );
};

export default CargasAno;
