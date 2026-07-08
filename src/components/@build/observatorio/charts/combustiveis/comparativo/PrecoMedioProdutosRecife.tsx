"use client";

import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const PrecoMedioProdutosRecife = ({
  data,
  title = "Preço Médio dos Produtos — Recife",
  colors = ColorPalette.default,
}: any) => {
  const chartData = (data?.produtosRecife ?? data?.comparacao ?? []).map((d: any) => ({
    produto: d.produto ?? d.municipio ?? "",
    preco: d.preco ?? 0,
  }));

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="produto"
          bars={[{ dataKey: "preco", name: "Preço Médio (R$)" }]}
          heightPerCategory={45}
          visibleHeight={340}
          widthY={140}
          highlightValues={[]}
        />
      </ChartGrabber>
    </div>
  );
};

export default PrecoMedioProdutosRecife;
