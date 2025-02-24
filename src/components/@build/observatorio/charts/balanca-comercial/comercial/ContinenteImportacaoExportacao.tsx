"use client";
import StackedBarChart from "@/components/@global/charts/StackedVerticalBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processImportacaoExportacaoPorContinente } from "@/functions/process_data/observatorio/balanca-comercial/comercial/charts/continentesImportacaoExportacao";
import ChartGrabber from "@/components/@global/features/ChartGrabber";

const ImportacaoExportacaoContinente = ({
  data = [],
  colors = ColorPalette.default,
  title = "Importação vs Exportação por Continente",
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
            { dataKey: "importacao", name: "Importação" },
            { dataKey: "exportacao", name: "Exportação" },
          ]}
          tooltipEntry=" dólares"
          heightPerCategory={80} // Define a altura de cada barra
          visibleHeight={400} // Define a altura visível para scroll
          chartType="continentesImportacaoExportacao" // Identifica o tipo de gráfico
        />
      </ChartGrabber>
    </div>
  );
};

export default ImportacaoExportacaoContinente;