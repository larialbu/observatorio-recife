"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processAtracacoesPorCarga } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoProdutos";

const PrincipaisProdutos = ({
  data,
  porto,
  title = "Passageiros por Aeroporto",
  year,
}: any) => {

  // console.log('DATA Q ESTÀ SENDO PASSADO GRAFICO 4', data)

  const chartData = processAtracacoesPorCarga(data.atracacao.filter((a: any) => a["Porto Atracação"] === porto), data.carga)
  // console.log('CAHARTDATA', chartData)

  return (
    <div className="relative bg-white w-full p-4">
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
