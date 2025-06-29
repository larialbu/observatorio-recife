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

const OperacaoCargasAno = ({
  data,
  colors = ColorPalette.default,
  title = "Movimentação de Cargas (Ton)",
  months
}: ChartBuild<PortoGeralData>) => {
//   const chartData = processPassageirosAno(data);
  const chartData = processAtracacoesPorMes(data.atracacao as PortoAtracacaoHeaders[], data.carga)

  const updatedData = updatedMonthChartData(chartData, months);
   
  return (
    <div className="chart-wrapper col-span-full">
      <ChartGrabber>
        <LineChart
          data={updatedData}
          title={title}
          colors={colors}
          xKey="mes"
          lines={[
            { dataKey: "cabotagemCarga", name: "Cabotagem (Ton)", strokeWidth: 2 },
            { dataKey: "exportacaoCarga", name: "Exportação (Ton)", strokeWidth: 2 },
            { dataKey: "importacaoCarga", name: "Importação (Ton)", strokeWidth: 2 },
            { dataKey: "outrosCarga", name: "outros (Ton)", strokeWidth: 2 },
          ]}
        />
      </ChartGrabber>
    </div>
  );
};

export default OperacaoCargasAno;
