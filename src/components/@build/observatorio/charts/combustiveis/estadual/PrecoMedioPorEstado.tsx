"use client";

import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const PrecoMedioPorEstado = ({ data, title = "Preço Médio por Estado", colors = ColorPalette.default }: any) => {
  const chartData = (data?.precoMedio ?? data?.dados ?? []).map((d: any) => ({
    estado: d.estado ?? d.nome ?? "",
    preco: d.preco ?? d.precoMedio ?? 0,
  }));

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <VerticalScrollableBarChart data={chartData} title={title} colors={colors}
          xKey="estado" bars={[{ dataKey: "preco", name: "Preço Médio (R$)" }]}
          heightPerCategory={40} visibleHeight={420} widthY={60}
          highlightValues={["PE"]} highlightColor="#0155AE" />
      </ChartGrabber>
    </div>
  );
};

export default PrecoMedioPorEstado;
