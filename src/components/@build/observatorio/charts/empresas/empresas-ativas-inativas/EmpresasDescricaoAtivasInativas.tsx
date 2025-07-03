"use client";

import React from "react";

import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import StackedBarChart from "@/components/@global/charts/StackedVerticalBarChart";

const EmpresasDescricaoAtivasInativas = ({
  data,
  colors = ColorPalette.default,
  title = "Empresas por Descrição",
  year,
}: any) => {
  const uniqueArrays = Array.from(new Set([...Object.keys(data['ativas']['desc_atividade']), ...Object.keys(data['inativas']['desc_atividade'])]))

  const chartData = uniqueArrays.map((key: string) => {
    const ativaNum = data['ativas']['desc_atividade'][key] || 0
    const inativaNum = data['inativas']['desc_atividade'][key] || 0

    return { label: key, ativa: ativaNum, inativa: inativaNum } 
  }).sort((a, b) => (b['ativa'] + b['inativa']) - (a['ativa'] + a['inativa']))

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <StackedBarChart
        data={chartData}
        title={title}
        colors={colors.slice(1)}
        xKey="label"
        bars={[
          { 
            dataKey: "ativa", 
            name: "Ativas",
          },
          { 
            dataKey: "inativa", 
            name: "Inativas",
          },
        ]}
        tooltipEntry=""
        heightPerCategory={80} // Define a altura de cada barra
        visibleHeight={400} // Define a altura visível para scroll
      />
      </ChartGrabber>
    </div>
  );
};

export default EmpresasDescricaoAtivasInativas;

