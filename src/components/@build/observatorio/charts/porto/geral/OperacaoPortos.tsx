"use client";

import React from "react";
import ScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processAtracacoesPorCarga } from "@/functions/process_data/observatorio/porto/geral/charts/transacaoProdutos";
import { getPortoProductNameByCode } from "@/utils/formatters/getPortoProductNameByCode";

function somarPortosTodosAnos(data: any[]) {
  const resultado: Record<string, number> = {};

  // Percorre o array de dados
  data.forEach((entry: any) => {
    const { portos } = entry;

    for (const porto in portos) {
      const nomePorto = porto.trim(); // Remove espaços extras

      // Se o porto já existe, soma os valores, senão, cria uma nova entrada
      if (!resultado[nomePorto]) {
        resultado[nomePorto] = 0;
      }
      resultado[nomePorto] += portos[porto]; // Soma as cargas dos anos diferentes
    }
  });

  // Retorna os portos consolidados no formato esperado
  return Object.entries(resultado).map(([porto, carga]) => ({
    porto,
    carga
  }));
}

function substituirMesPorNumero(data: any) {
  const meses = {
      'Jan': 1, 'Fev': 2, 'Mar': 3, 'Abr': 4, 'Mai': 5, 'Jun': 6,
      'Jul': 7, 'Ago': 8, 'Set': 9, 'Out': 10, 'Nov': 11, 'Dez': 12,
      'Total': 0
  };

  return data.map((entry: any) => ({
      ...entry,
      mes: meses[entry.mes] ?? entry.mes // Mantém o valor original caso não esteja no dicionário
  }));
}

const OperacaoPortos = ({
  data, 
  months,
  title = "Operação dos Portos (Ton)",
  year,
}: any) => {

  const chartData = somarPortosTodosAnos(months.selected.length ? substituirMesPorNumero(data.charts.portos).filter((obj: any) => months.selected.includes(obj.mes)) : substituirMesPorNumero(data.charts.portos).filter((item: any) => item.mes !== 0)).sort((a, b) => b.carga - a.carga)

  console.log('CHARDTAA', chartData.filter((data) => data.porto.includes('Aquaviário') ))

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <ScrollableBarChart
          data={chartData}
          title={title}
          xKey="porto"
          bars={[{ dataKey: "carga", name: "Porto" }]}
          colors={ColorPalette.default}
          heightPerCategory={50}
        />
      </ChartGrabber>
    </div>
  );
};

export default OperacaoPortos;
