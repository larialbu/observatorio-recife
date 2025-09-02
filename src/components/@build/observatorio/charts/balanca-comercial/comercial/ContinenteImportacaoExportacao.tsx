"use client";

import { ChartBuild } from "@/@types/observatorio/shared";
import StackedBarChart from "@/components/@global/charts/StackedVerticalBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processGetImportacaoExportacao } from "@/functions/process_data/observatorio/balanca-comercial/comercial/charts/getImportacaoExportacao";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

type DataType = Record<string, Record<string, Record<string, number>>>;

const ImportacaoExportacaoContinente = ({
  data = {},
  colors = ColorPalette.default,
  title="Importação vs Exportação por Continente"
}: ChartBuild<DataType>) => {

  const dataImportacao = data?.['Importação']?.['Continente'] || {}
  const dataExportacao = data?.['Exportação']?.['Continente'] || {}

  const chartData = processGetImportacaoExportacao(dataImportacao, dataExportacao, true) 

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <StackedBarChart
        data={chartData}
        title={title}
        colors={colors.slice(1)}
        xKey="label"
        bars={[
          { 
            dataKey: "importacao", 
            name: "Importação",
            showPercentage: true,
            percentageField: "percentualImportacao",
          },
          { 
            dataKey: "exportacao", 
            name: "Exportação",
            showPercentage: true,
            percentageField: "percentualExportacao",
          },
        ]}
        tooltipEntry=" dólares"
        heightPerCategory={80} // Define a altura de cada barra
        visibleHeight={400} // Define a altura visível para scroll
      />
      </ChartGrabber>
    </div>
  );
};

export default ImportacaoExportacaoContinente;
