"use client";

import  { useState } from "react";

import { ChartBuild } from "@/@types/observatorio/shared";
import PieChart from "@/components/@global/charts/PieChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { ShowPercentages } from "@/components/@global/features/ShowPercentages";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

type DataType = Record<string, Record<string, Record<string, number>>>;

const TotalImportacaoExportacao = ({
  data = {},
  colors = ColorPalette.default,
  title = "Total Importação e Exportação",
}: ChartBuild<DataType>) => {
  const [showPercentage, setShowPercentage] = useState(true);

  const dataImportacao = data?.['Importação']?.['tipo'] || {}
  const dataExportacao = data?.['Exportação']?.['tipo'] || {}

  const chartData = [
    { label: 'Importação', value: dataImportacao?.['Importação'] || 0 },
    { label: 'Exportação', value: dataExportacao?.['Exportação'] || 0 },
  ];

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
          dataKey="value"
          nameKey="label"
          colors={colors}
          showPercentages={showPercentage}
          tooltipEntry=" dólares"
        />
      </ChartGrabber>
    </div>
  );
};

export default TotalImportacaoExportacao;
