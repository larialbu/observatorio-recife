"use client";

import React from "react";

import { PortoGeralData } from "@/@types/observatorio/@data/portoData";
import { ChartBuild } from "@/@types/observatorio/shared";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { getObjToArr } from "@/utils/formatters/getObjToArr";

const PrincipaisProdutos = ({
  data,
  title = "Produtos Comercializados (Ton)",
}: ChartBuild<PortoGeralData>) => {
  const dataAccumulated = data?.['accumulated'] || {}

  const chartData = getObjToArr<number>(dataAccumulated?.['nomeMercadoria'] || {}).sort((a, b) => b.value - a.value);
  
  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="label"
          bars={[{ dataKey: "value", name: "Produto" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
          widthY={130}
          left={-15}
        />
      </ChartGrabber>
    </div>
  );
};

export default PrincipaisProdutos;
