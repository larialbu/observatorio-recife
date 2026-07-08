"use client";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const LinhaTransmissoes = ({
  data,
  title = "Quantidade de Transmissões Imobiliárias",
  colors = ColorPalette.default,
}: any) => {
  const chartData: any[] = data?.linhaTransmissoes ?? [];

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="mes"
          tooltipEntry=""
          lines={[{ dataKey: "quantidade", name: "Transmissões", strokeWidth: 2 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default LinhaTransmissoes;
