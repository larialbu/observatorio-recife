"use client";
import StackedBarChart from "@/components/@global/charts/StackedVerticalBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processImportacaoExportacaoPorContinente } from "@/functions/process_data/observatorio/balanca-comercial/comercial/charts/continentesImportacaoExportacao";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import { calculateTotals, calculateIndividualPercentages } from "@/functions/process_data/observatorio/balanca-comercial/comercial/charts/percentualNegociado";

const ImportacaoExportacaoContinente = ({
  data = [],
  colors = ColorPalette.default,
  title = "Importação vs Exportação por Continente",
}: any) => {
  // Processa os dados iniciais
  const processedData = processImportacaoExportacaoPorContinente(data);

  // Calcula os totais gerais
  const { totalImportacao, totalExportacao } = calculateTotals(processedData);
  const totalNegociado = totalExportacao + totalImportacao;

  // Calcula os percentuais individuais por continente
  const percentages = calculateIndividualPercentages(
    processedData,
    totalNegociado,
    "continente"
  );

  console.log("Dados formatados para o gráfico:", percentages);

  return (
    <div className="chart-wrapper">
      <ChartGrabber>
        <StackedBarChart
          data={processedData}
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
          heightPerCategory={80}
          visibleHeight={400}
          percentages={{
            keyField: "continente", // Chave usada nos dados
            valueField: "percentualImportacao", // Campo do percentual de importação
            data: percentages // Seu array de percentuais
          }}
          minCellWidth={6.5}
        />
      </ChartGrabber>
    </div>
  );
};

export default ImportacaoExportacaoContinente;