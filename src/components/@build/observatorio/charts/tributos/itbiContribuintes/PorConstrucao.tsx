"use client";

import HorizontalScrollableBarChart from "@/components/@global/charts/HorizontalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const PorConstrucao = ({ data, title = "Quantidade de Transmissões por Tipo de Construção", colors = ColorPalette.default }: any) => {
  const chartData = data?.porConstrucao ?? [];

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <HorizontalScrollableBarChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="tipo"
          widthMultiply={80}
          bars={[{ dataKey: "quantidade", name: "Transmissões" }]}
          xAxisOrientation="bottom"
        />
      </ChartGrabber>
    </div>
  );
};

export default PorConstrucao;
