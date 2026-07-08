"use client";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const EvolucaoPrecoMunicipio = ({ data, title = "Evolução do Preço Médio por Município", colors = ColorPalette.default }: any) => {
  const evolucao: any[] = data?.evolucao ?? [];
  const municipios: string[] = evolucao.length > 0
    ? Object.keys(evolucao[0]).filter((k) => k !== "ano")
    : [];

  // "Recife" sempre em azul, os demais municípios seguem a paleta padrão
  const lineColors = municipios.map((m, i) => (m.includes("Recife") ? "#0155AE" : colors[i % colors.length]));

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={evolucao}
          title={title}
          colors={lineColors}
          xKey="ano"
          tooltipEntry="R$"
          height={500}
          lines={municipios.map((m) => ({ dataKey: m, name: m, strokeWidth: 2 }))}
        />
      </ChartGrabber>
    </div>
  );
};

export default EvolucaoPrecoMunicipio;
