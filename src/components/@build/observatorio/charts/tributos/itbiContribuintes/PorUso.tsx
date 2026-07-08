"use client";

import { useState } from "react";

import PieChart from "@/components/@global/charts/PieChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { ShowPercentages } from "@/components/@global/features/ShowPercentages";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const PorUso = ({ data, title = "Quantidade de Transmissões pelo Uso do Imóvel", colors = ColorPalette.default }: any) => {
  const [showPercentage, setShowPercentage] = useState(true);
  const chartData = data?.porUso ?? [];

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <PieChart
          data={chartData}
          title={title}
          underTitle={<ShowPercentages showPercentage={showPercentage} setShowPercentage={setShowPercentage} />}
          dataKey="quantidade"
          nameKey="uso"
          colors={colors}
          showPercentages={showPercentage}
          tooltipEntry=""
        />
      </ChartGrabber>
    </div>
  );
};

export default PorUso;
