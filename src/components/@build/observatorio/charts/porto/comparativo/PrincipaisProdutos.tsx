"use client";

import React from "react";

import { PortoGeralData } from "@/@types/observatorio/@data/portoData";
import { PortoAtracacaoHeaders } from "@/@types/observatorio/@fetch/porto";
import { ChartBuild } from "@/@types/observatorio/shared";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processAtracacoesPorCarga } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoProdutos";
import { getPortoProductNameByCode } from "@/utils/formatters/getPortoProductNameByCode";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { getObjToArr } from "@/utils/formatters/getObjToArr";

const PrincipaisProdutos = ({
  data,
  color = ColorPalette.default,
  porto,
  title = "Produtos Comercializados (Ton)" + ` - ${porto}`,
}: ChartBuild<PortoGeralData>) => {

  const dataAccumulated = data?.['accumulated'] || {}

  const rawData = dataAccumulated?.['nomeMercadoria'] || {};

  const filteredData: Record<string, number> = {};

  Object.entries(rawData).forEach(([key, val]) => {
    if (typeof val === 'number') {
      filteredData[key] = val;
    }
  });

  const chartData = getObjToArr<number>(filteredData).sort((a, b) => b.value - a.value); 

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="label"
          bars={[{ dataKey: "value", name: "Produto" }]}
          colors={[color]}
          heightPerCategory={50}
        />
      </ChartGrabber>
    </div>
  );
};

export default PrincipaisProdutos;
