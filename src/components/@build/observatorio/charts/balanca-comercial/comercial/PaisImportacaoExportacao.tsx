"use client";

import StackedBarChart from "@/components/@global/charts/StackedVerticalBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processImportacaoExportacaoPorPais } from "@/functions/process_data/observatorio/balanca-comercial/comercial/charts/paisesImportacaoExportacao";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import {
  calculateTotals,
  calculateIndividualPercentages, // Nova função para percentuais separados
} from "@/functions/process_data/observatorio/balanca-comercial/comercial/charts/percentualNegociado";

const ImportacaoExportacaoPorPais = ({
  data = [],
  colors = ColorPalette.default,
}: any) => {
  // Processa os dados iniciais
  const processedData = processImportacaoExportacaoPorPais(data);

  // Calcula os totais gerais
  const { totalImportacao, totalExportacao } = calculateTotals(processedData);
  const totalNegociado = totalExportacao + totalImportacao;

  // Calcula os percentuais individuais por país
  const percentages = calculateIndividualPercentages(
    processedData,
    totalNegociado,
    "pais"
  );

  console.log("Dados formatados para o gráfico:", percentages);

  return (
    <div className="relative bg-white w-full p-4">
      <ChartGrabber>
        <StackedBarChart
          data={processedData}
          title="Importação vs Exportação por País"
          colors={colors.slice(1)}
          xKey="pais" // Chave usada nos dados (nome do país)
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
          heightPerCategory={60} // Define a altura de cada categoria (barra)
          visibleHeight={400} // Ajuste a altura do scroll
          percentages={{
            keyField: "pais", // Chave usada nos dados (nome do país)
            valueField: "percentualImportacao", // Campo do percentual de importação
            data: percentages, // Array de percentuais separados
          }}
          minCellWidth={6}
        />
      </ChartGrabber>
    </div>
  );
};

export default ImportacaoExportacaoPorPais;