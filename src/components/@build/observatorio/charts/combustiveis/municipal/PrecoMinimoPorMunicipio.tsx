"use client";

import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const PrecoMinimoPorMunicipio = ({ data, title = "Preço Mínimo por Município", colors = ColorPalette.default }: any) => {
  const chartData = (data?.precoMinimo ?? data?.dados ?? []).map((d: any) => ({
    municipio: d.municipio ?? d.nome ?? "",
    preco: d.preco ?? d.precoMinimo ?? 0,
  }));

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <VerticalScrollableBarChart data={chartData} title={title} colors={[colors[2]]}
          xKey="municipio" bars={[{ dataKey: "preco", name: "Preço Mínimo (R$)" }]}
          heightPerCategory={40} visibleHeight={420} widthY={100}
          highlightValues={["Recife"]} highlightColor="#EC6625" />
      </ChartGrabber>
    </div>
  );
};

export default PrecoMinimoPorMunicipio;
