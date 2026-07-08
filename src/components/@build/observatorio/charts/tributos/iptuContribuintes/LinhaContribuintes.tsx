"use client";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const LinhaContribuintes = ({ data, title = "Total de Contribuintes do IPTU", colors = ColorPalette.default }: any) => {
  const chartData: any[] = data?.linhaContribuintes ?? [];

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="mes"
          tooltipEntry=""
          lines={[{ dataKey: "total", name: "Contribuintes", strokeWidth: 2 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default LinhaContribuintes;
