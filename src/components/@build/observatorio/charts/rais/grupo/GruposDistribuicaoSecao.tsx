"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getObjToArr } from "@/utils/formatters/getObjToArr";
import { raisGrupoDicts } from "@/utils/dicts/rais/raisGrupoDicts";
import { raisDivisaoSecaoDicts } from "@/utils/dicts/rais/raisDivisaoSecaoDicts";
import { uniqueLabel } from "@/functions/process_data/observatorio/empregos/rais/demografia/geralFuncition";

const GruposDistribuicaoSecao = ({
  data,
  title = "(Secao) Distribuição formal de empregos por grau de instrução",
  year,
}: any) => {
  
  const chartData = uniqueLabel(getObjToArr<number>(data['divisao'] || {}).map((item) => ({...item, label: raisDivisaoSecaoDicts[item.label] }))).sort((a, b) => b.value - a.value)

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="label"
          bars={[{ dataKey: "value", name: "Escolaridade" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
          widthY={130}
          left={-15}
        />
      </ChartGrabber>
    </div>
  );
};

export default GruposDistribuicaoSecao;
