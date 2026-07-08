"use client";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const EvolucaoPrecoEstado = ({ data, title = "Evolução do Preço Médio por Estado", colors = ColorPalette.default }: any) => {
  const evolucao: any[] = data?.evolucao ?? [];
  const estados: string[] = evolucao.length > 0
    ? Object.keys(evolucao[0]).filter((k) => k !== "ano")
    : [];

  // "PE" sempre em azul, os demais seguem a paleta padrão
  const lineColors = estados.map((e, i) => (e === "PE" ? "#0155AE" : colors[i % colors.length]));

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
          lines={estados.map((e) => ({ dataKey: e, name: e, strokeWidth: 2 }))}
        />
      </ChartGrabber>
    </div>
  );
};

export default EvolucaoPrecoEstado;
