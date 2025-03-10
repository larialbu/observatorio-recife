"use client";

import StackedBarChart from "@/components/@global/charts/StackedVerticalBarChart";
import ColorPalette from "@/utils/palettes/charts/ColorPalette";
import { processComercializacaoPorProduto } from "@/functions/process_data/observatorio/balanca-comercial/comercial/charts/produtosImportacaoExportacao";
import ChartGrabber from "@/components/@global/features/ChartGrabber";
import {
  calculateTotals,
  calculateIndividualPercentages, // Nova função para percentuais separados
} from "@/functions/process_data/observatorio/balanca-comercial/comercial/charts/percentualNegociado";

const ImportacaoExportacaoPorProduto = ({
  data = [],
  colors = ColorPalette.default,
  title = "Produtos Comercializados",
}: any) => {
  // Processa os dados iniciais
  const processedData = processComercializacaoPorProduto(data);

  // Calcula os totais gerais
  const { totalImportacao, totalExportacao } = calculateTotals(processedData);
  const totalNegociado = totalExportacao + totalImportacao;

  // Calcula os percentuais individuais por produto
  const percentages = calculateIndividualPercentages(
    processedData,
    totalNegociado,
    "descricao"
  );

  console.log("Dados formatados para o gráfico:", percentages);

  return (
    <div className="relative bg-white w-full p-4">
      <ChartGrabber>
        <StackedBarChart
          data={processedData}
          title={title}
          colors={colors.slice(1)}
          xKey="descricao" // Chave usada nos dados (nome do produto)
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
          left={15} // Espaçamento à esquerda
          yFontSize={11} // Tamanho da fonte do eixo Y
          percentages={{
            keyField: "descricao", // Chave usada nos dados (nome do produto)
            valueField: "percentualImportacao", // Campo do percentual de importação
            data: percentages, // Array de percentuais separados
          }}
          minCellWidth={7}
        />
      </ChartGrabber>
    </div>
  );
};

export default ImportacaoExportacaoPorProduto;