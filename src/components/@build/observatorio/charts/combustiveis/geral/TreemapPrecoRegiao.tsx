"use client";

import TreeMapChart from "@/components/@global/charts/TreeMapChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const TreemapPrecoRegiao = ({
  data,
  title = "Preço Médio por Região",
  colors = ColorPalette.default,
}: any) => {
  const chartData = (data?.porRegiao ?? []).map((d: any) => ({
    label: d.nome ?? d.regiao ?? "",
    value: d.preco ?? 0,
  }));

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <TreeMapChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="label"
          dataKey="value"
          tooltipEntry="R$"
          integerInfos={false}
          highlightValues={["Nordeste"]}
          highlightColor="#0155AE"
        />
      </ChartGrabber>
    </div>
  );
};

export default TreemapPrecoRegiao;
