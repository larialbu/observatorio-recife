"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processAtracacoesPorCarga } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoProdutos";

const PrincipaisProdutos = ({
  data,
  title = "Passageiros por Aeroporto",
  year,
}: any) => {
  const chartData = processAtracacoesPorCarga(data.atracacao, data.carga)

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
