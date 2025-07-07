"use client";

import React from "react";

import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const EmpresasSecao = ({
  data,
  municipio,
  color,
  title = "Empresas por Natureza Jurídica",
  year,
}: any) => {
  const dataEmpresas = data 
  // const dataEmpresas = data['empresas']

  const chartData = getObjToArr<number>(dataEmpresas?.['nome_secao'] || {}).sort((a, b) => b.value - a.value)

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title + ` - (${municipio})`}
          xKey="label"
          bars={[{ dataKey: "value", name: "Quantidade" }]}
          colors={[color]}
          heightPerCategory={50}
          widthY={130}
          left={-15}
        />
      </ChartGrabber>
    </div>
  );
};

export default EmpresasSecao;
