"use client";

import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const PorBairro = ({ data, title = "Total de Contribuintes do IPTU por Bairro", colors = ColorPalette.default }: any) => {
  const chartData = data?.porBairro ?? [];

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          colors={[colors[1]]}
          xKey="bairro"
          bars={[{ dataKey: "quantidade", name: "Contribuintes" }]}
          heightPerCategory={40}
          visibleHeight={420}
          widthY={140}
          highlightValues={[]}
        />
      </ChartGrabber>
    </div>
  );
};

export default PorBairro;
