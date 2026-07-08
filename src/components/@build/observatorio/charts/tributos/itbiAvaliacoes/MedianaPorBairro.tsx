"use client";

import HorizontalScrollableBarChart from "@/components/@global/charts/HorizontalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const MedianaPorBairro = ({ data, title = "Mediana do Valor de Transmissão por Bairro", colors = ColorPalette.default }: any) => {
  const chartData = data?.medianaPorBairro ?? [];

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <HorizontalScrollableBarChart
          data={chartData}
          title={title}
          colors={[colors[1]]}
          xKey="bairro"
          bars={[{ dataKey: "mediana", name: "Mediana (R$)" }]}
          widthMultiply={130}
          heightToPass={285}
          tooltipEntry="R$"
        />
      </ChartGrabber>
    </div>
  );
};

export default MedianaPorBairro;
