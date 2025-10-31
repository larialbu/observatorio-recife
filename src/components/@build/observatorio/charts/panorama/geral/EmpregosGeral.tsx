"use client";

import React, { useState } from "react";

import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import PieChart from "@/components/@global/charts/PieChart";
import { ShowPercentages } from "@/components/@global/features/ShowPercentages";

const EmpregosGeral = ({
  data,
  title = "Empregos Geral",
}: any) => {
  const [showPercentage, setShowPercentage] = useState(true);
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
        <PieChart
          data={chartData}
          title={title}
          underTitle={
            <ShowPercentages
              showPercentage={showPercentage}
              setShowPercentage={setShowPercentage}
            />
          }
          dataKey="value"
          nameKey="label"
          colors={ColorPalette.default}
          showPercentages={showPercentage}
          tooltipEntry=""
        />
      </ChartGrabber>
    </div>
  );
};

export default EmpregosGeral;
