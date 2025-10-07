"use client";

import React from "react";

import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { empresasCapitalsDicts } from "@/utils/dicts/empresas/empresasCapitalsDicts";

const EmpresasMediaAbertura = ({
  data,
  color,
//   municipio,
  title = "Tempo Médio Abertura de Empresas (Horas)",
  year,
}: any) => {
  const dataEmpresas = data['empresas'] || {}

  const dataKeys = Object.keys(dataEmpresas)
  
  const dataFlat = dataKeys.map((dataMap) => dataEmpresas[dataMap]).flat()
  
  const dataMonthCur = Array.from(new Set(dataFlat.map((data) => data['mes']))).sort((a: number, b: number) => b - a)[0]

  const dataFiltred = dataFlat.filter((data: any) => data['mes'] === dataMonthCur && empresasCapitalsDicts[data['Municipio']])

  const chartData = dataFiltred.map((data) => ({ label: data['Municipio'].split(' - ')[0], value: data?.['Tempo_Medio_Abertura'] || 0 }))?.sort((a, b) => b?.['value'] - a?.['value'])

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          xKey="label"
          bars={[{ dataKey: "value", name: "Tempo" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
          widthY={130}
          left={-15}
        />
      </ChartGrabber>
    </div>
  );
};

export default EmpresasMediaAbertura;
