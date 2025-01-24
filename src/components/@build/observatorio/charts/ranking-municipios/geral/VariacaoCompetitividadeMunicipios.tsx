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
  title = "Variação da Posição no Ranking Geral de Competitividade dos Municípios",
}) => {
  const chartData = processVariacaoPosicao(data);

  if (!chartData || chartData.length === 0) {
    return <p>Nenhum dado disponível.</p>;
  }

  const allKeys = Object.keys(chartData[0]);
  const municipios = allKeys.filter((key) => key !== "ano");

  const lines = municipios.map((municipio) => ({
    dataKey: municipio,
    name: municipio,
    strokeWidth: 2,
  }));

  return (
    <div className="relative bg-white w-full p-4">
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
