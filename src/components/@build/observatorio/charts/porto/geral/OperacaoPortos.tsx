"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processAtracacoesPorCarga } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoProdutos";
import { getPortoProductNameByCode } from "@/utils/formatters/getPortoProductNameByCode";
import { processCargasPorPorto } from "@/functions/process_data/observatorio/porto/geral/charts/opecaoPorPorto";


type PortoData = {
  'Porto Atracação': string;
  Latitude: string;
  Longitude: string;
  Mes: number;
  IDAtracacao: number;
  VLPesoCargaBruta: number; // Adicionei a propriedade Carga, assumindo que seja a quantidade a ser somada
};

function somarCargasPorPorto(data: PortoData[]): { porto: string, carga: number }[] {
  const resultado: Record<string, number> = {};

  data.forEach(entry => {
    const nomePorto = entry['Porto Atracação'];

    // Se o porto já foi registrado, soma a carga; senão, cria uma nova entrada
    if (!resultado[nomePorto]) {
      resultado[nomePorto] = 0;
    }
    resultado[nomePorto] += entry.VLPesoCargaBruta; // Soma a carga
  });

  // Retorna os portos com a carga somada
  return Object.entries(resultado).map(([porto, carga]) => ({
    porto,
    carga
  }));
}

const OperacaoPortos = ({
  data,
  months,
  title = "Operação Portos (Ton)",
  year,
}: any) => {
  const dataCoords =  data?.coords?.[0] || []

  const monthsToRead = months?.selected.length ? months.selected : months.options

  const dataToRead = dataCoords.filter((data: any) => monthsToRead.includes(parseInt(data.Mes))) || []

  const chartData = processCargasPorPorto(dataToRead)

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="porto"
          bars={[{ dataKey: "carga", name: "Porto (Ton)" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
          widthY={150}
        />
      </ChartGrabber>
    </div>
  );
};

export default OperacaoPortos;
