"use client";

import React from "react";

import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const EmpresasMediaAbertura = ({
  data,
  color,
//   municipio,
  title = "Empresas por Natureza Jurídica",
  year,
}: any) => {
  const dataEmpresas = data

  const dataKeys = Object.keys(data)
  
  const dataFlat = dataKeys.map((dataMap) => data[dataMap]).flat()
  
  const dataMonthCur = Array.from(new Set(dataFlat.map((data) => data['mes']))).sort((a: number, b: number) => b - a)[0]

  const dataFiltred = dataFlat.filter((data: any) => data['mes'] === dataMonthCur)
  // const dataEmpresas = data['empresas']
  console.log('DATA -><-', data)
  console.log('dataKEYS', dataKeys)
  
  console.log('dataCOmplete', dataKeys.map((dataMap) => data[dataMap]).flat())
  console.log('DATAMonths', dataMonthCur)
  console.log('DATAFILTRED', dataFiltred)

//   const chartData = getObjToArr<number>(dataEmpresas?.['Subclasse'] || {}).sort((a, b) => b.value - a.value)

  return (
    <div className="chart-wrapper">
      {/* <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
        //   title={title + ` - (${municipio})`}
          xKey="label"
          bars={[{ dataKey: "value", name: "Quantidade" }]}
          colors={[color]}
          heightPerCategory={50}
          widthY={130}
          left={-15}
        />
      </ChartGrabber> */}
    </div>
  );
};

export default EmpresasMediaAbertura;
