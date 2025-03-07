"use client";

import  { useState } from "react";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import PieChart from "@/components/@global/charts/PieChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processTotalImportacaoExportacao } from "@/functions/process_data/observatorio/balanca-comercial/comercial/charts/totalImportacaoExportacao";
import { ShowPercentages } from "@/components/@global/features/ShowPercentages";

const TotalImportacaoExportacao = ({
  data = [],
  colors = ColorPalette.default,
  title = "Total Importação e Exportação",
}: any) => {
  const [showPercentage, setShowPercentage] = useState(true);

  const chartData = processTotalImportacaoExportacao(data);

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <PieChart
          data={chartData}
          title={title}
          underTitle={
            <ShowPercentages
              showPercentage={showPercentage}
              setShowPercentage={setShowPercentage}
            />
          }
          dataKey="total"
          nameKey="tipo"
          colors={colors}
          showPercentages={showPercentage}
          tooltipEntry=" dólares"
        />
      </ChartGrabber>
    </div>
  );
};

export default TotalImportacaoExportacao;
