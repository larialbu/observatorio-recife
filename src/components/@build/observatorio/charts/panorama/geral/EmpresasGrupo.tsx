"use client";

import React from "react";

import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const EmpresasGrupo = ({
  data,
  title = "Empresas Ativas Grupo de Atividade Econômico",
}: any) => {
  const empresas = data?.data?.['empresas'] || []

  const result = empresas.reduce((acc: Record<string, number>, obj: Record<string, number>) => {
    if (!acc[obj['Grupo']]) acc[obj['Grupo']] = 0 

    acc[obj['Grupo']] += 1

    return acc
  }, {
    
  })
  
  const chartData = Object.keys(result).map((key) => ({ label: key, value: result[key] })).sort((a, b) => b.value - a.value)

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

export default EmpresasGrupo;
