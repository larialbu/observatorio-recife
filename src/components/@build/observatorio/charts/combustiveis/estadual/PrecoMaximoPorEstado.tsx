"use client";

import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const PrecoMaximoPorEstado = ({ data, title = "Preço Máximo por Estado", colors = ColorPalette.default }: any) => {
  const chartData = (data?.precoMaximo ?? data?.dados ?? []).map((d: any) => ({
    estado: d.estado ?? d.nome ?? "",
    preco: d.preco ?? d.precoMaximo ?? 0,
  }));

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <VerticalScrollableBarChart data={chartData} title={title} colors={[colors[1]]}
          xKey="estado" bars={[{ dataKey: "preco", name: "Preço Máximo (R$)" }]}
          heightPerCategory={40} visibleHeight={420} widthY={60}
          highlightValues={["PE"]} highlightColor="#52B348" />
      </ChartGrabber>
    </div>
  );
};

export default PrecoMaximoPorEstado;
