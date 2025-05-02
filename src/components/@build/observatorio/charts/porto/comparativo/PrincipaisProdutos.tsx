"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processAtracacoesPorCarga } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoProdutos";
import { getPortoProductNameByCode } from "@/utils/formatters/getPortoProductNameByCode";
import { ChartBuild } from "@/@types/observatorio/shared";
import { PortoGeralData } from "@/@types/observatorio/@data/portoData";
import { PortoAtracacaoHeaders } from "@/@types/observatorio/@fetch/porto";

const PrincipaisProdutos = ({
  data,
  color = ColorPalette.default,
  porto,
  title = "Produtos Comercializados (Ton)" + ` - ${porto}`,
}: ChartBuild<PortoGeralData>) => {

  const chartData = getPortoProductNameByCode(processAtracacoesPorCarga(data.atracacao as PortoAtracacaoHeaders[], data.carga), data.dictionaries.mercado)

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="CDMercadoria"
          bars={[{ dataKey: "totalVLPesoCargaBruta", name: "Produto" }]}
          colors={[color]}
          heightPerCategory={50}
        />
      </ChartGrabber>
    </div>
  );
};

export default PrincipaisProdutos;
