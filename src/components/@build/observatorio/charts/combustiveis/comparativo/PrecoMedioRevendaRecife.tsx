"use client";

import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const PrecoMedioRevendaRecife = ({
  data,
  title = "Preço Médio de Revenda — Recife",
  colors = ColorPalette.default,
}: any) => {
  const chartData: any[] = data?.linhaRecife ?? data?.comparacao?.map((d: any) => ({
    mes: d.municipio ?? "",
    preco: d.preco ?? 0,
  })) ?? [];

  // Mesma escala do Y usada no painel do município comparado, pra dar pra comparar visualmente
  const allPrecos = [...chartData, ...(data?.linhaComparativo ?? [])].map((d: any) => d.preco).filter((v: number) => v != null);
  const yDomain = allPrecos.length
    ? [parseFloat((Math.min(...allPrecos) * 0.98).toFixed(2)), parseFloat((Math.max(...allPrecos) * 1.01).toFixed(2))]
    : undefined;

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="mes"
          tooltipEntry="R$"
          yAxis={yDomain ? { domain: yDomain } : undefined}
          lines={[{ dataKey: "preco", name: "Recife (R$)", strokeWidth: 2 }]}
        />
      </ChartGrabber>
    </div>
  );
};

export default PrecoMedioRevendaRecife;
