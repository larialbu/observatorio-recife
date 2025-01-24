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
  // 1) Processar/transformar os dados de acordo com sua lógica
  const chartData = processMunicipiosCompetitividade(data);
  
  // 2) Identifica os municípios presentes nos dados
  //    (remoção de "ano" - ou a chave que estiver em 'nameKey')
  const municipios = Object.keys(chartData[0] || {}).filter(
    (key) => key !== nameKey
  );

  // 3) Se quiser limitar a 25 municípios (por exemplo):
  const limitedMunicipios = municipios.slice(0, 25);

  // 4) Seleciona cores respeitando a ordem para não bagunçar
  const selectedColors = limitedMunicipios.map(
    (_, index) => colors[index % colors.length]
  );

  return (
    <div className="relative bg-white w-full p-4">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          // Passamos as cores já cortadas/ordenadas
          colors={selectedColors}
          xKey={nameKey}
          // 5) Gera dinamicamente as linhas
          lines={limitedMunicipios.map((municipio, i) => ({
            dataKey: municipio,
            name: municipio,
            strokeWidth: 2,
            // se quiser cor fixa para cada linha, também pode:
            // stroke: selectedColors[i]
          }))}
        />
      </ChartGrabber>
      <p className="text-xs text-gray-500">
        Máximo de 25 itens para visualização, somente os primeiros serão incluídos alfabeticamente.
      </p>
    </div>
  );
};

export default CompetitividadePorAno;
