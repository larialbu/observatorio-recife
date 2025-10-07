"use client";

import React from "react";

import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const EmpresaGrupo = ({
  data,
  title = "Empresas por Grupo de Atividade Econômico",
  year,
}: any) => {
  const dataEmpresas = data?.['empresas'] || []
  
  const chartData = getObjToArr<number>(dataEmpresas['Grupo'] || {}).sort((a, b) => b.value - a.value)
    
  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          xKey="label"
          bars={[{ dataKey: "value", name: "Quantidade" }]}
          colors={ColorPalette.default}
          left={10}
          height={300}  
          heightPerCategory={50}
        />
      </ChartGrabber>
    </div>
  );
};

export default EmpresaGrupo;
