"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import { raisGrupoDicts } from "@/utils/dicts/rais/raisGrupoDicts";
import { raisClassesDicts } from "@/utils/dicts/rais/raisClassesDicts";
import { uniqueLabel } from "@/functions/process_data/observatorio/empregos/rais/demografia/geralFuncition";

const GruposDistribuicaoClasses = ({
  data,
  title = "Estoque formal de empregos por Descrição Classe",
  year,
}: any) => {
  
  const chartData = uniqueLabel(getObjToArr<number>(data['CBO Ocupação 2002'] || {})).sort((a, b) => b.value - a.value)

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="label"
          bars={[{ dataKey: "value", name: "Quantidade" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
          widthY={130}
          left={-15}
        />
      </ChartGrabber>
    </div>
  );
};

export default GruposDistribuicaoClasses;
