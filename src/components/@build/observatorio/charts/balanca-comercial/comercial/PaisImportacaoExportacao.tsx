"use client";

import StackedBarChart from "@/components/@global/charts/StackedVerticalBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processImportacaoExportacaoPorPais } from "@/functions/process_data/observatorio/balanca-comercial/comercial/charts/paisesImportacaoExportacao";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import {
  calculateTotalPercentages,
  calculateTotals,
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

  // Calcula os percentuais totais por país
  const percentages = calculateTotalPercentages(
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
          xKey="pais"
          bars={[
            {
              dataKey: "importacao",
              name: "Importação",
            },
            {
              dataKey: "exportacao",
              name: "Exportação",
              showPercentage: true,
            },
          ]}
          tooltipEntry=" dólares"
          heightPerCategory={60} // Define a altura de cada categoria (barra)
          visibleHeight={400} // Ajuste a altura do scroll
          percentages={{
            keyField: "pais", // Chave usada nos dados
            valueField: "totalPercentual", // Campo do percentual
            data: percentages, // Seu array de percentuais
          }}
          minBarWidth={11}
        />
      </ChartGrabber>
    </div>
  );
};

export default ImportacaoExportacaoPorPais;