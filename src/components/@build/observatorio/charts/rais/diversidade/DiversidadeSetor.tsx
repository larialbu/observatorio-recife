"use client";

import React from "react";

import TreeMapChart from "@/components/@global/charts/TreeMapChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const DiversidadeSetor = ({
  data = [],
  nameKey = "AEROPORTO REGIÃO",
  colors = ColorPalette.default,
  title = "Distribuição formal de empregos por Setor (necessidades especiais)",
  
}: any) => {
 
  const chartData = getObjToArr<number>(data['setor'] || {})

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <TreeMapChart data={chartData} title={title} colors={colors} xKey={'label'} dataKey={'value'}/>
      </ChartGrabber>
    </div>
  );
};

export default DiversidadeSetor;
