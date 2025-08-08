"use client";

import React from "react";

import { PortoGeralData } from "@/@types/observatorio/@data/portoData";
import { ChartBuild } from "@/@types/observatorio/shared";
import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { updatedMonthChartData } from "@/utils/filters/@global/updateMonthChartData";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import { monthShortName } from "@/utils/formatters/@global/monthShortName";

const OperacaoCargasAno = ({
  data,
  colors = ColorPalette.default,
  title = "Movimentação de Cargas (Ton)",
  months
}: ChartBuild<PortoGeralData>) => {
  const dataAccumulated = data?.['accumulated'] || {}

const chartData = getObjToArr(dataAccumulated?.['Ação'] || {})
  .sort((a, b) => +a['label'] - +b['label'])
  .map((dataMap) => {
    const val = dataMap.value;
    const getValue = (key: string) => typeof val === 'object' && val !== null ? val['key'] ?? 0 : 0
    return {
      label: monthShortName(+dataMap.label),
      cabotagemCarga: getValue('Cabotagem'),
      exportacaoCarga: getValue('Exportação'),
      importacaoCarga: getValue('Importação'),
      outrosCarga: getValue('Outros'),
    }
  });


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
