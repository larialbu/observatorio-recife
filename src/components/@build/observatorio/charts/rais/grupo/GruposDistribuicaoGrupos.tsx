"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import { raisGrupoDicts } from "@/utils/dicts/rais/raisGrupoDicts";
import { uniqueLabel } from "@/functions/process_data/observatorio/rais/demografia/geralFuncition";

const GruposDistribuicaoGrupos = ({
  data,
  title = "Estoque formal de empregos por Profissão",
  year,
}: any) => {
  
  const chartData = uniqueLabel(getObjToArr<number>(data['grupo'] || {}).map((item) => ({...item, label: raisGrupoDicts[item.label] }))).sort((a, b) => b.value - a.value)

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
          left={20}
        />
      </ChartGrabber>
    </div>
  );
};

export default GruposDistribuicaoGrupos;
