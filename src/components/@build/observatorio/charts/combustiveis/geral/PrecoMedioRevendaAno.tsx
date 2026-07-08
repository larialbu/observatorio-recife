"use client";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const PrecoMedioRevendaAno = ({
  data,
  title = "Preço Médio de Revenda por Ano",
  colors = ColorPalette.default,
}: any) => {
  const chartData: any[] = data?.linhaPrecoMedio ?? [];

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="mes"
          tooltipEntry="R$"
          lines={[{ dataKey: "preco", name: "Preço Médio (R$)", strokeWidth: 2 }]}
          yAxis={{ domain: [4, 8] }}
        />
      </ChartGrabber>
    </div>
  );
};

export default PrecoMedioRevendaAno;
