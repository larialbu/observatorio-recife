"use client";

import { ChartBuild } from "@/@types/observatorio/shared";
import StackerBarChartVertical from "@/components/@global/charts/StackedVerticalBarChart";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { processGetImportacaoExportacao } from "@/functions/process_data/observatorio/balanca-comercial/comercial/charts/getImportacaoExportacao";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";

type DataType = Record<string, Record<string, Record<string, number>>>;

const ImportacaoExportacaoPorPais = ({
  data = {},
  colors = ColorPalette.default,
}: ChartBuild<DataType>) => {

  const dataImportacao = data?.['Importação']?.['País'] || {}
  const dataExportacao = data?.['Exportação']?.['País'] || {}

  const chartData = processGetImportacaoExportacao(dataImportacao, dataExportacao, true) 
 

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <StackerBarChartVertical
        data={chartData}
        title="Importação vs Exportação por País"
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
        heightPerCategory={60}  // Define a altura de cada categoria (barra)
        visibleheight={300}  // Ajuste a altura do scroll
        left={0}
        widthY={100}
      />
      </ChartGrabber>
      
    </div>
  );
};

export default ImportacaoExportacaoPorPais;
