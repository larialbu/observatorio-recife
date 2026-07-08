"use client";

import BarChart from "@/components/@global/charts/BarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const PrecoMedioPorRegiao = ({ data, title = "Preço Médio por Região", colors = ColorPalette.default }: any) => {
  const chartData = (data?.precoMedio ?? data?.dados ?? []).map((d: any) => ({
    regiao: d.regiao ?? d.nome ?? "",
    preco: d.preco ?? d.precoMedio ?? 0,
  }));

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <BarChart data={chartData} title={title} colors={colors} xKey="regiao"
          bars={[{ dataKey: "preco", name: "Preço Médio (R$)" }]} tooltipEntry="R$"
          highlightValues={["Nordeste"]} highlightColor="#0155AE" />
      </ChartGrabber>
    </div>
  );
};

export default PrecoMedioPorRegiao;
