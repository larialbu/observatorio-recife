"use client";

import { useState } from "react";

import PieChart from "@/components/@global/charts/PieChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { ShowPercentages } from "@/components/@global/features/ShowPercentages";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

// TODO: trocar por um gráfico de rosca (innerRadius) de verdade quando o PieChart global suportar a variação;
// por enquanto reaproveita o PieChart padrão.
const PorUsoRosca = ({ data, title = "Valor Total Arrecadado do IPTU pelo Uso do Imóvel", colors = ColorPalette.default }: any) => {
  const [showPercentage, setShowPercentage] = useState(true);
  const chartData = data?.porUso ?? [];

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <PieChart
          data={chartData}
          title={title}
          underTitle={<ShowPercentages showPercentage={showPercentage} setShowPercentage={setShowPercentage} />}
          dataKey="valor"
          nameKey="uso"
          colors={colors}
          showPercentages={showPercentage}
          tooltipEntry="R$"
        />
      </ChartGrabber>
    </div>
  );
};

export default PorUsoRosca;
