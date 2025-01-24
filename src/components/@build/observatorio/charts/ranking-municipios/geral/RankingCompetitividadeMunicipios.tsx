"use client";

import React from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import LineChart from "@/components/@global/charts/LineChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processMunicipiosCompetitividade } from "@/functions/process_data/observatorio/ranking-municipios/geral/charts/rankingCompetitividadeMunicipios";

interface CompetitividadePorAnoProps {
  data: any;
  colors?: string[];
  title?: string;
  nameKey?: string;
}

const CompetitividadePorAno: React.FC<CompetitividadePorAnoProps> = ({
  data,
  colors = ColorPalette.default,
  title = "Posição Geral de Competitividade dos Municípios",
  nameKey = "ano",
}) => {
  const chartData = processMunicipiosCompetitividade(data);
  
  const municipios = Object.keys(chartData[0] || {}).filter(
    (key) => key !== nameKey
  );

  const limitedMunicipios = municipios.slice(0, 25);

  const selectedColors = limitedMunicipios.map(
    (_, index) => colors[index % colors.length]
  );

  return (
    <div className="relative bg-white w-full p-4">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          colors={selectedColors}
          xKey={nameKey}
          yAxis={{ reversed: true }}
          lines={limitedMunicipios.map((municipio, i) => ({
            dataKey: municipio,
            name: municipio,
            strokeWidth: 2,
          }))}
        />
      </ChartGrabber>
      <p className="text-xs text-gray-500">
        Máximo de 25 itens para visualização, somente os primeiros selecionados serão incluídos alfabeticamente.
      </p>
    </div>
  );
};

export default CompetitividadePorAno;
