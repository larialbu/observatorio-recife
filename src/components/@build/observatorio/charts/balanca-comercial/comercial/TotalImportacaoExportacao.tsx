"use client";

import  { useState } from "react";

import { BalancaHeaders } from "@/@types/observatorio/@fetch/balanca-comercial";
import { ChartBuild } from "@/@types/observatorio/shared";
import PieChart from "@/components/@global/charts/PieChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { ShowPercentages } from "@/components/@global/features/ShowPercentages";
import { processTotalImportacaoExportacao } from "@/functions/process_data/observatorio/balanca-comercial/comercial/charts/totalImportacaoExportacao";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

const TotalImportacaoExportacao = ({
  data = [],
  colors = ColorPalette.default,
  title = "Total Importação e Exportação",
}: ChartBuild<BalancaHeaders[]>) => {
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
