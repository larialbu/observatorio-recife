"use client";

import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const PrecoMedioProdutosMunicipio = ({
  data,
  municipio,
  title,
  colors = ColorPalette.default,
}: any) => {
  const label = municipio || "Município";
  const chartData = (data?.produtosComparativo ?? []).map((d: any) => ({
    produto: d.produto ?? "",
    preco: d.preco ?? 0,
  }));

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        {chartData.length > 0 ? (
          <VerticalScrollableBarChart
            data={chartData}
            title={title ?? `Preço Médio dos Produtos — ${label}`}
            colors={[colors[2]]}
            xKey="produto"
            bars={[{ dataKey: "preco", name: `Preço Médio (R$)` }]}
            heightPerCategory={45}
            visibleHeight={340}
            widthY={140}
            highlightValues={[]}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-[400px] text-gray-400 dark:text-gray-600">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-3 opacity-40">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-sm">Selecione um município no filtro para comparar</p>
          </div>
        )}
      </ChartGrabber>
    </div>
  );
};

export default PrecoMedioProdutosMunicipio;
