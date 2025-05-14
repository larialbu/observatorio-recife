"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import TreeMapChart from "@/components/@global/charts/TreeMapChart";
import { getObjToArr } from "@/utils/formatters/getObjToArr";

const MovimentacaoGrupo = ({
  data = [],
  nameKey = "AEROPORTO REGIÃO",
  colors = ColorPalette.default,
  title = "Grupo",
//   title = "Distribuição desligamentos de empregos por Setor",
  
}: any) => {
 
  const chartData = getObjToArr<number>(data['seção'] || {})

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <TreeMapChart data={chartData} title={title} colors={colors} xKey={'label'} dataKey={'value'}/>
      </ChartGrabber>
    </div>
  );
};

export default MovimentacaoGrupo;
