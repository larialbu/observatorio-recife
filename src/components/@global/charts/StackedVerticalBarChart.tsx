import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { tooltipFormatter, yAxisFormatter } from "@/utils/formatters/@global/graphFormatter";
import CustomLegend from "../features/CustomLegend";
import CustomTooltip from "../features/CustomTooltip";

/**
 * Função auxiliar para calcular o percentual relativo.
 * @param valorNegociado Valor da categoria atual (importação ou exportação).
 * @param valorTotalGeral Valor total geral de todas as categorias.
 * @returns O percentual relativo da categoria em relação ao total.
 */
function calcularPercentualRelativo(valorNegociado: number, valorTotalGeral: number): number {
  return valorTotalGeral > 0 ? (valorNegociado / valorTotalGeral) * 100 : 0;
}

const StackerBarChartVertical = ({
  data,
  title,
  xKey,
  bars,
  colors = [],
  heightPerCategory = 50, // Altura de cada barra
  visibleHeight = 300, // Altura visível do gráfico
  tooltipEntry,
  left = -35,
  yFontSize = 12,
  showValues = false,
  chartType, // Novo prop para identificar o tipo de gráfico
}: any) => {
  // Calcula a altura total com base no número de categorias
  let totalHeight = data.length * heightPerCategory;
  if (data.length <= 5) totalHeight = 400;

  // Define uma interface para os dados
  interface DataItem {
    [key: string]: any; // Permite acessar qualquer chave dinamicamente
    importacao?: number | string; // Aceita tanto números quanto strings
    exportacao?: number | string; // Aceita tanto números quanto strings
  }

  // Calcula o valor total geral de todas as categorias
  const valorTotalGeral = (data as DataItem[]).reduce(
    (sum: number, item: DataItem) =>
      sum +
      parseFloat(item.importacao?.toString() || "0") +
      parseFloat(item.exportacao?.toString() || "0"),
    0
  );

  // Função customizada para o tooltip
  const customTooltipFormatter = (tooltipProps: any) => {
    const payload = tooltipProps.payload;
    if (!payload || payload.length === 0) return null;

    // Acessa os dados da categoria atual
    const categoriaAtual = payload[0]?.payload;
    if (!categoriaAtual) return null;

    // Extrai os valores de importação e exportação
    const importacao = parseFloat(categoriaAtual.importacao?.toString() || "0");
    const exportacao = parseFloat(categoriaAtual.exportacao?.toString() || "0");

    // Calcula os percentuais relativos
    const percentualImportacao = calcularPercentualRelativo(importacao, valorTotalGeral);
    const percentualExportacao = calcularPercentualRelativo(exportacao, valorTotalGeral);

    // Retorna os dados formatados para o CustomTooltip
    return (
      <CustomTooltip
        active={true}
        payload={[
          { name: "Importação", value: importacao, percent: percentualImportacao },
          { name: "Exportação", value: exportacao, percent: percentualExportacao },
        ]}
        label={categoriaAtual[xKey]}
        customTooltipFormatter={(value: any) => tooltipFormatter(value, tooltipEntry || "")}
        chartType={chartType} // Passa o tipo de gráfico para o CustomTooltip
      />
    );
  };

  return (
    <div className="relative bg-white w-full">
      <h3 className="text-center mb-[2em] font-semibold">{title}</h3>
      {/* Wrapper para scroll vertical */}
      <div
        className="overflow-y-auto overflow-x-visible"
        style={{ height: `${visibleHeight}px` }} // Define a altura visível do gráfico
      >
        <div>
          <ResponsiveContainer width="100%" height={totalHeight}>
            <RechartsBarChart
              data={data}
              layout="vertical"
              margin={{ top: 0, right: 7, left: left, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                tickFormatter={yAxisFormatter}
                tick={{ fontSize: 12 }}
                orientation="top"
              />
              <YAxis
                type="category"
                dataKey={xKey}
                tick={{ fontSize: yFontSize }}
                interval={0}
                width={150}
              />
              <Tooltip content={customTooltipFormatter} />
              <Legend
                verticalAlign="top"
                align="center"
                iconSize={20}
                content={({ payload }) => {
                  return (
                    <div className="flex justify-center ml-10 mt-2">
                      <div className="w-[90%]">
                        <CustomLegend payload={payload} />
                      </div>
                    </div>
                  );
                }}
              />
              {bars.map((bar: any, index: any) => (
                <Bar
                  key={index}
                  dataKey={bar.dataKey}
                  name={bar.name}
                  stackId="stack"
                  fill={colors[index]}
                  label={{
                    position: "insideRight",
                    content: (props: any) => {
                      const { x, y, width, height, value, index: dataIndex } = props;

                      // Verifica se esta barra é a de "importação"
                      if (bar.name !== "Importação") {
                        return null; // Não exibe o texto se não for a barra de importação
                      }

                      // Acessa os dados da categoria atual usando o índice
                      const categoriaAtual = (data as DataItem[])[dataIndex];
                      if (!categoriaAtual) {
                        console.warn(`Dados não encontrados para a barra no índice ${dataIndex}`);
                        return null;
                      }

                      // Extrai os valores de importação e exportação
                      const importacao = parseFloat(categoriaAtual.importacao?.toString() || "0");
                      const exportacao = parseFloat(categoriaAtual.exportacao?.toString() || "0");

                      // Calcula o percentual relativo para a importação
                      const percentualImportacao = calcularPercentualRelativo(importacao, valorTotalGeral);
                      const percentualExportacao = calcularPercentualRelativo(exportacao, valorTotalGeral);
                      const percentualTotal = percentualImportacao + percentualExportacao;

                      // Define um limite mínimo para exibir o texto
                      const minWidthForLabel = 35; // Ajuste conforme necessário
                      if (width < minWidthForLabel) {
                        return null; // Não exibe o texto se a barra for muito pequena
                      }

                      return (
                        <text
                          x={x + width - 10} // Ajuste horizontal para alinhar o texto
                          y={y + height / 2} // Centraliza verticalmente
                          dy=".35em" // Ajuste fino para centralizar verticalmente
                          fill="#fff" // Cor do texto
                          fontSize="14" // Tamanho da fonte
                          textAnchor="end" // Alinhamento do texto
                          fontWeight="medium"
                        >
                          {`${percentualTotal.toFixed(2)}%`} {/* Exibe o percentual relativo */}
                        </text>
                      );
                    },
                  }}
                >
                  {/* Define a cor de cada célula */}
                  {data.map((entry: any, dataIndex: any) => {
                    const color =
                      entry[xKey] === "Recife"
                        ? colors[(index % colors.length) + 2]
                        : colors[index % colors.length];
                    return <Cell key={`cell-${dataIndex}`} fill={color} />;
                  })}
                </Bar>
              ))}
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StackerBarChartVertical;