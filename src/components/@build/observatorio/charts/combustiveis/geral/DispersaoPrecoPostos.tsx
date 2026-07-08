"use client";

import ScatterChart from "@/components/@global/charts/ScatterChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const DispersaoPrecoPostos = ({
  data,
  title = "Preço Médio × Quantidade de Postos",
  colors = ColorPalette.default,
}: any) => {
  // One series per product so each point gets its own color and legend entry
  const rawData: any[] = data?.dispersao ?? [];
  const series = rawData.map((d: any, i: number) => ({
    name: d.produto,
    data: [{ precoMedio: d.precoMedio, postos: d.postos, produto: d.produto }],
  }));

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <ScatterChart
          series={series}
          title={title}
          xKey="precoMedio"
          yKey="postos"
          xLabel="Preço Médio (R$)"
          yLabel="Qtd. de Postos"
          colors={colors}
          tooltipEntry="Postos"
        />
      </ChartGrabber>
    </div>
  );
};

export default DispersaoPrecoPostos;
