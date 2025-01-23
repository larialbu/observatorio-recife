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
    // Processamento inicial dos dados
    const chartData = processMunicipiosCompetitividade(data);
  
    // Identifica os municípios presentes nos dados processados
    const municipios = Object.keys(chartData[0] || {}).filter((key) => key !== "ano");
  
    // Seleciona as cores para os municípios (limite de 5)
    const selectedColors = municipios.map((_, index) => colors[index % colors.length]);
  
    return (
      <div className="relative bg-white w-full p-4">
        <ChartGrabber>
          <LineChart
            data={chartData}
            title={title}
            colors={selectedColors}
            xKey={nameKey}
            lines={municipios.map((municipio) => ({
              dataKey: municipio,
              name: municipio,
              strokeWidth: 2,
            }))}
          />
        </ChartGrabber>
      </div>
    );
  };
  
  export default CompetitividadePorAno;
  