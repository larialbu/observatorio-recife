"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import TreeMapChart from "@/components/@global/charts/TreeMapChart";
import { getObjToArr } from "@/utils/formatters/getObjToArr";

const GrupoSetor = ({
  data = [],
  nameKey = "AEROPORTO REGIÃO",
  colors = ColorPalette.default,
  title = "Estoque formal de empregos por Setor",
  
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

export default GrupoSetor;
