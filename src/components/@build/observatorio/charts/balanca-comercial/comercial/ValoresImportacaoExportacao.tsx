"use client";

import { ChartBuild } from "@/@types/observatorio/shared";
import LineChart from "@/components/@global/charts/LineChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processGetImportacaoExportacao } from "@/functions/process_data/observatorio/balanca-comercial/comercial/charts/getImportacaoExportacao";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

type DataType = Record<string, Record<string, Record<string, number>>>;


const CargasAnoComparativo = ({
  data = {},
  colors = ColorPalette.default,
  title = "Valores Importação e Exportação",
}: ChartBuild<DataType>) => {

  const dataImportacao = data?.['Importação']?.['Mês'] || {}
  const dataExportacao = data?.['Exportação']?.['Mês'] || {}

  const chartData = processGetImportacaoExportacao(dataImportacao, dataExportacao) 

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <LineChart
          data={chartData}
          title={title}
          colors={[colors[0], colors[1]]}
          xKey="mes"
          lines={[
            { dataKey: "importacao", name: "Importação" },
            { dataKey: "exportacao", name: "Exportação" },
          ]}
          tooltipEntry=" dólares"
        />
      </ChartGrabber>
    </div>
  );
};

export default CargasAnoComparativo;
