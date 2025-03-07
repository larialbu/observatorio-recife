"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processAtracacoesPorCarga } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoProdutos";
import { getPortoProductNameByCode } from "@/utils/formatters/getPortoProductNameByCode";

const PrincipaisProdutos = ({
  data,
  porto,
  title = "Produtos Comercializados (Ton)" + ` - ${porto}`,
  year,
}: any) => {

  const chartData = getPortoProductNameByCode(processAtracacoesPorCarga(data.atracacao, data.carga), data.dictionaries.mercado)

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="CDMercadoria"
          bars={[{ dataKey: "totalVLPesoCargaBruta", name: "Produto" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
        />
      </ChartGrabber>
    </div>
  );
};

export default PrincipaisProdutos;
