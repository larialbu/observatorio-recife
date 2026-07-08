"use client";

import BarChart from "@/components/@global/charts/BarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const PrecoMinimoPorRegiao = ({ data, title = "Preço Mínimo por Região", colors = ColorPalette.default }: any) => {
  const chartData = (data?.precoMinimo ?? data?.dados ?? []).map((d: any) => ({
    regiao: d.regiao ?? d.nome ?? "",
    preco: d.preco ?? d.precoMinimo ?? 0,
  }));

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <BarChart data={chartData} title={title} colors={[colors[2]]} xKey="regiao"
          bars={[{ dataKey: "preco", name: "Preço Mínimo (R$)" }]} tooltipEntry="R$"
          highlightValues={["Nordeste"]} highlightColor="#EC6625" />
      </ChartGrabber>
    </div>
  );
};

export default PrecoMinimoPorRegiao;
