"use client";
import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processVariacaoPosicao } from "@/functions/process_data/observatorio/ranking-municipios/geral/charts/variacaoCompetitividadeMunicipios";

interface VariacaoCompetividadeDimensaoMunicipiosProps {
  data: any;
  colors?: string[];
  title?: string;
  nameKey?: string;
}

const VariacaoCompetividadeDimensaoMunicipios: React.FC<
  VariacaoCompetividadeDimensaoMunicipiosProps
> = ({
  data,
  colors = ColorPalette.default,
  title = "Variação de Posição no Ranking Geral de Competitividade dos Municípios",
  nameKey = "ano",
}) => {
  // Processamento inicial dos dados para variação de posição
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
    <div className="chart-wrapper">
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

export default VariacaoCompetividadeDimensaoMunicipios;
