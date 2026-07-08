"use client";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const REGIOES = ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"];

const EvolucaoPrecoRegiao = ({ data, title = "Evolução do Preço Médio por Região", colors = ColorPalette.default }: any) => {
  const chartData: any[] = data?.evolucao ?? [];

  // "Nordeste" sempre em azul, as demais regiões seguem a paleta padrão
  const lineColors = REGIOES.map((r, i) => (r === "Nordeste" ? "#0155AE" : colors[i % colors.length]));

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          colors={lineColors}
          xKey="ano"
          tooltipEntry="R$"
          height={500}
          lines={REGIOES.map((r) => ({ dataKey: r, name: r, strokeWidth: 2 }))}
        />
      </ChartGrabber>
    </div>
  );
};

export default EvolucaoPrecoRegiao;
