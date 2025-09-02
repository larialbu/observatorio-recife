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
  title="Produtos Comercializados"
}: ChartBuild<DataType>) => {

  const dataImportacao = data?.['Importação']?.['Descrição SH4'] || {}
  const dataExportacao = data?.['Exportação']?.['Descrição SH4'] || {}

  const chartData = processGetImportacaoExportacao(dataImportacao, dataExportacao, true) 

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <StackedBarChart
        data={chartData}
        colors={colors.slice(1)}
        title={title}
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
        heightPerCategory={60}   
        visibleHeight={400}
        widthY={150}
        left={-8}
        yFontSize={11}
        tooltipTitleFontSize={13}
      />
      </ChartGrabber>
      
    </div>
  );
};

export default ImportacaoExportacaoContinente;
