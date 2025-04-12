"use client";

import StackedBarChart from "@/components/@global/charts/StackedVerticalBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processImportacaoExportacaoPorContinente } from "@/functions/process_data/observatorio/balanca-comercial/comercial/charts/continentesImportacaoExportacao";
import ChartGrabber from "@/components/@global/features/ChartGrabber";

const ImportacaoExportacaoContinente = ({
  data = [],
  colors = ColorPalette.default,
  title="Importação vs Exportação por Continente"
}: any) => {
  const chartData = processImportacaoExportacaoPorContinente(data);

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <StackedBarChart
        data={chartData}
        title={title}
        colors={colors.slice(1)}
        xKey="continente"
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
