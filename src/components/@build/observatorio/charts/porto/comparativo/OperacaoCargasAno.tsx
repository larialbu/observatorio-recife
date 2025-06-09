"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import { processAtracacoesPorMes } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoPorMes";
import { ChartBuild } from "@/@types/observatorio/shared";
import { RawDataPortos } from "@/@types/observatorio/@data/portoData";

const OperacaoCargasAno = ({
  data,
  porto,
  colors = ColorPalette.default,
  title = "Movimentação de Cargas (Ton)"  + ` - ${porto}`,
  months
}: ChartBuild<RawDataPortos>) => {
  console.log('LOg Operacao Ano', data)

  console.log('Usnado', data.atracacao, data.carga)

  const chartData = processAtracacoesPorMes(data.atracacao, data.carga)

  const updatedData = updatedMonthChartData(chartData, months ?? 1);

   
  return (
    <div className="chart-wrapper">
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
