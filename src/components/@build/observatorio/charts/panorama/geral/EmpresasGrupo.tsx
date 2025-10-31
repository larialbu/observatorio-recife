"use client";

import React from "react";

import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import PieChart from "@/components/@global/charts/PieChart";
import { ShowPercentages } from "@/components/@global/features/ShowPercentages";
import TreeMapChart from "@/components/@global/charts/TreeMapChart";

const EmpresasGrupo = ({
  data,
  title = "Empresas Ativas Grupo de Atividade Econômico",
  colors = ColorPalette.default,
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
        <TreeMapChart data={chartData} title={title} colors={colors} xKey={'label'} dataKey={'value'}/>
      </ChartGrabber>
    </div>
  );
};

export default EmpresasGrupo;
