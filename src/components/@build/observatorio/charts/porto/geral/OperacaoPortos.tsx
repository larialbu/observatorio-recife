"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processAtracacoesPorCarga } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoProdutos";
import { getPortoProductNameByCode } from "@/utils/formatters/getPortoProductNameByCode";

const OperacaoPortos = ({
  data, 
  title = "Produtos Comercializados (Ton)",
  year,
}: any) => {
    console.log('DDATA OPERACAO PORTOS ->', data)

  const chartData = data.charts.portos.sort((a: any, b: any) => b.VLPesoCargaBruta - a.VLPesoCargaBruta)

    console.log('CHARTDA ADDAAD', chartData)

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="Porto Atracação"
          bars={[{ dataKey: "VLPesoCargaBruta", name: "Produto" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
        />
      </ChartGrabber>
    </div>
  );
};

export default OperacaoPortos;
