"use client";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const LinhaValorTotal = ({ data, title = "Valor Total do IPTU", colors = ColorPalette.default }: any) => {
  const chartData: any[] = data?.linhaValorTotal ?? [];

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="mes"
          tooltipEntry="R$"
          lines={[{ dataKey: "valor", name: "Valor Total (R$)", strokeWidth: 2 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default LinhaValorTotal;
