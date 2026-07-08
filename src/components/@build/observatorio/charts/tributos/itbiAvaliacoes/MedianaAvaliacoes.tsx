"use client";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const MedianaAvaliacoes = ({ data, title = "Mediana das Avaliações dos Imóveis", colors = ColorPalette.default }: any) => {
  const chartData: any[] = data?.medianaAvaliacoes ?? [];

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="mes"
          tooltipEntry="R$"
          lines={[{ dataKey: "mediana", name: "Mediana (R$)", strokeWidth: 2 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default MedianaAvaliacoes;
