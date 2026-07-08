"use client";

import VerticalScrollableBarChart from "@/components/@global/charts/VerticalScrollableBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const PrecoMedioCapitais = ({
  data,
  title = "Preço Médio nas Capitais",
  colors = ColorPalette.default,
}: any) => {
  const chartData = (data?.porEstado ?? []).map((d: any) => ({
    nome: d.nome ?? d.estado ?? "",
    preco: d.preco ?? 0,
  }));

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <VerticalScrollableBarChart
          data={chartData}
          title={title}
          colors={colors}
          xKey="nome"
          bars={[{ dataKey: "preco", name: "Preço Médio (R$)" }]}
          heightPerCategory={40}
          visibleHeight={420}
          widthY={60}
          highlightValues={["PE"]}
          highlightColor="#0155AE"
        />
      </ChartGrabber>
    </div>
  );
};

export default PrecoMedioCapitais;
