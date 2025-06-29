"use client";

import React from "react";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processMunicipiosCompetitividade } from "@/functions/process_data/observatorio/ranking-municipios/geral/charts/rankingCompetitividadeMunicipios";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

interface RankingCompetitividadeDimensaoMunicipiosProps {
  data: any;
  colors?: string[];
  title?: string;
  nameKey?: string;
}

const RankingCompetitividadeDimensaoMunicipios: React.FC<
  RankingCompetitividadeDimensaoMunicipiosProps
> = ({
  data,
  colors = ColorPalette.default,
  title = "Posição Geral de Competitividade dos Municípios",
  nameKey = "ano",
}) => {
  // Processamento inicial dos dados
  const chartData = processMunicipiosCompetitividade(data);

  // Identifica os municípios presentes nos dados processados
  const municipios = Object.keys(chartData[0] || {}).filter(
    (key) => key !== "ano"
  );

  // Seleciona as cores para os municípios (limite de 5)
  const selectedColors = municipios.map(
    (_, index) => colors[index % colors.length]
  );

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          colors={selectedColors}
          xKey={nameKey}
          yAxis={{ reversed: true }}
          lines={municipios.map((municipio) => ({
            dataKey: municipio,
            name: municipio,
            strokeWidth: 2,
          }))}
        />
      </ChartGrabber>
      <div>
        <p className="text-xs text-gray-500">
          Máximo de 25 items para visualização, somente os primeiros serão
          incluídos alfabeticamente.
        </p>
      </div>
    </div>
  );
};

export default RankingCompetitividadeDimensaoMunicipios;
