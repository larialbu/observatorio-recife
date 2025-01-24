"use client";
import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineAreaChart from "@/components/@global/charts/LineAreaChart";
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
  console.log(chartData);

  const municipios = Object.keys(chartData[0] || {}).filter(
    (key) => key !== "ano"
  );

  const selectedColors = municipios.map(
    (_, index) => colors[index % colors.length]
  );

  return (
    <div className="relative bg-white w-full p-4">
      <ChartGrabber>
        <LineAreaChart
          data={chartData}
          title={title}
          colors={selectedColors}
          xKey={nameKey}
          areaKeys={municipios}
        />
      </ChartGrabber>
      <p className="text-xs text-gray-500">
        Máximo de 25 items para visualização, somente os primeiros serão
        incluídos alfabeticamente.
      </p>
    </div>
  );
};

export default VariacaoCompetividadeDimensaoMunicipios;
