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
  LabelList,
} from "recharts";
import { tooltipFormatter, yAxisFormatter } from "@/utils/formatters/@global/graphFormatter";
import CustomLegend from "../features/CustomLegend";
import CustomTooltip from "../features/CustomTooltip";
import { createPercentageMap } from "@/functions/process_data/observatorio/balanca-comercial/comercial/charts/percentualNegociado";

type DataEntry = {
  [key: string]: any;
};

type BarConfig = {
  dataKey: string;
  name: string;
  showPercentage?: boolean;
  percentageField?: string; // Campo opcional para especificar o campo de percentual
};

type StackedBarChartProps = {
  data: DataEntry[];
  title?: string;
  xKey: string;
  bars: BarConfig[];
  colors?: string[];
  heightPerCategory?: number;
  visibleHeight?: number;
  tooltipEntry?: string;
  left?: number;
  yFontSize?: number;
  percentages?: {
    keyField: string;
    valueField: string;
    data: { [key: string]: any }[];
  };
  minBarWidth?: number;
  minCellWidth?: number;
};

const StackedBarChart = ({
  data,
  title,
  xKey,
  bars,
  colors = [],
  heightPerCategory = 50,
  visibleHeight = 300,
  tooltipEntry = "",
  left = -35,
  yFontSize = 12,
  percentages,
  minBarWidth = 0,
  minCellWidth = 0,
}: StackedBarChartProps) => {
  const totalHeight = data.length <= 5 ? 400 : data.length * heightPerCategory;

  // Cria o mapa de porcentagens usando a função externa presente em percentualNegociado.ts
  const percentageMap = percentages
    ? createPercentageMap(percentages.data, percentages.keyField)
    : {};

  // Calcula o valor máximo total das barras (soma de todas as chaves de dados)
  const maxValue = data.reduce((max, entry) => {
    const totalValue = bars.reduce(
      (sum, bar) => sum + (typeof entry[bar.dataKey] === "number" ? entry[bar.dataKey] : 0),
      0
    );
    return Math.max(max, totalValue);
  }, 0);

  return (
    <div className="relative bg-white w-full">
      {title && <h3 className="text-center mb-8 font-semibold">{title}</h3>}
      <div className="overflow-y-auto overflow-x-visible" style={{ height: `${visibleHeight}px` }}>
        <ResponsiveContainer width="100%" height={totalHeight}>
          <RechartsBarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 7, left, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              tickFormatter={yAxisFormatter}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              type="category"
              dataKey={xKey}
              tick={{ fontSize: yFontSize }}
              interval={0}
              width={150}
            />
            <Tooltip
              content={(props) => (
                <CustomTooltip
                  {...props}
                  customTooltipFormatter={(value: any) =>
                    tooltipFormatter(value, tooltipEntry)
                  }
                />
              )}
            />
            <Legend
              verticalAlign="top"
              align="center"
              content={({ payload }) => (
                <div className="flex justify-center ml-10 mt-2">
                  <div className="w-11/12">
                    <CustomLegend payload={payload} />
                  </div>
                </div>
              )}
              iconSize={20}
            />
            {bars.map((barConfig, index) => (
              <Bar
                key={index}
                dataKey={barConfig.dataKey}
                name={barConfig.name}
                stackId="stack"
                fill={colors[index]}
              >
                {data.map((_, dataIndex) => (
                  <Cell
                    key={`cell-${dataIndex}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
                {barConfig.showPercentage && percentages && (
                  <LabelList
                    dataKey={(entry: DataEntry) => {
                      const identifier = entry[xKey];
                      const percentageItem = percentageMap[String(identifier)];

                      if (!percentageItem) return "";

                      const cellValue = entry[barConfig.dataKey];
                      const visualCellWidth =
                        typeof cellValue === "number" ? (cellValue / maxValue) * 100 : 0;

                      // Verifica se o tamanho visual da célula é suficiente para exibir o valor
                      if (typeof visualCellWidth === "number" && visualCellWidth >= minCellWidth) {
                        // Usa o campo 'percentageField' para acessar o valor percentual dinamicamente
                        const percentageValue = barConfig.percentageField
                          ? percentageItem[barConfig.percentageField]
                          : null;

                        if (typeof percentageValue === "number") {
                          return `${percentageValue.toFixed(2)}%`;
                        }
                      }

                      return ""; // Caso a célula for muito pequena, retorna uma string vazia
                    }}
                    position="insideRight"
                    fill="#fff"
                    fontSize={13}
                    fontWeight="semibold"
                  />
                )}
              </Bar>
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StackedBarChart;