"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processVariacaoPosicao } from "@/functions/process_data/observatorio/ranking-municipios/geral/charts/variacaoCompetitividadeMunicipios";

interface Props {
  data: any[];  // filteredData
  colors?: string[];
  title?: string;
}

const GraficoMunicipiosPorAno: React.FC<Props> = ({
  data = [],
  colors = ColorPalette.default,
  title = "Comparativo por Município ao longo dos anos",
}) => {
  // 1) Pivot / processamento
  const chartData = processVariacaoPosicao(data);

  // 2) Se não há dados, exiba algo ou retorne null
  if (!chartData || chartData.length === 0) {
    return <p>Nenhum dado disponível.</p>;
  }

  // 3) Identificar as chaves (municípios) disponíveis, exceto a "ano"
  const allKeys = Object.keys(chartData[0]);
  const municipios = allKeys.filter((key) => key !== "ano");

  // 4) Criar dinamicamente as linhas
  //    (Opcional: limitar a 25 pra não poluir, etc.)
  const lines = municipios.map((municipio) => ({
    dataKey: municipio,
    name: municipio, // Label na legenda
    strokeWidth: 2,
  }));

  return (
    <div className="relative bg-white w-full">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="ano"
          lines={lines}
        />
      </ChartGrabber>
    </div>
  );
};

export default GraficoMunicipiosPorAno;
