"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { getObjToArr } from "@/utils/formatters/getObjToArr";

const DesligamentosFaixaEtaria = ({
  data,
  title = "Distribuição desligamentos de empregos por faixa etária",
  year,
}: any) => {
  
  const { "89": _, ...defics } = data['Motivo Desligamento'] || {}

  const chartData = getObjToArr<number>(defics || {}).sort((a, b) => b.value - a.value).map((item) => ({ ...item, label: item.label.split(' - ')[1] }))

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
          widthY={200}
          left={-15}
        />
      </ChartGrabber>
    </div>
  );
};

export default DesligamentosFaixaEtaria;
