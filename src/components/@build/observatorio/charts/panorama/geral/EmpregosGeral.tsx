"use client";

import React from "react";

import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const EmpregosGeral = ({
  data,
  title = "Empregos Geral",
}: any) => {
  const empregos = data?.data?.['caged'] || []
  
  const result = empregos.reduce((acc: Record<string, number>, obj: Record<string, number>) => {

    acc['Demissões'] += obj['Demissões']
    acc['Saldos'] += obj['Saldos']
    acc['Admissões'] += obj['Admissões']

    return acc
  }, {
    'Demissões': 0,
    'Saldos': 0,
    'Admissões': 0, 
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

export default EmpregosGeral;
