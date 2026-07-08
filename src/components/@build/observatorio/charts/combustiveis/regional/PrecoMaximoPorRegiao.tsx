"use client";

import BarChart from "@/components/@global/charts/BarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const PrecoMaximoPorRegiao = ({ data, title = "Preço Máximo por Região", colors = ColorPalette.default }: any) => {
  const chartData = (data?.precoMaximo ?? data?.dados ?? []).map((d: any) => ({
    regiao: d.regiao ?? d.nome ?? "",
    preco: d.preco ?? d.precoMaximo ?? 0,
  }));

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <BarChart data={chartData} title={title} colors={[colors[1]]} xKey="regiao"
          bars={[{ dataKey: "preco", name: "Preço Máximo (R$)" }]} tooltipEntry="R$"
          highlightValues={["Nordeste"]} highlightColor="#52B348" />
      </ChartGrabber>
    </div>
  );
};

export default PrecoMaximoPorRegiao;
