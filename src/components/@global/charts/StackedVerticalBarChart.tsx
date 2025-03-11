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

type DataEntry = {
  [key: string]: any;
};

type BarConfig = {
  dataKey: string;
  name: string;
  showPercentage?: boolean;
};

type StackedBarChartProps = {
  data: DataEntry[];
  title: string;
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
  minBarWidth?: number; // Limite mínimo para exibir o valor (em pixels)
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
  minBarWidth = 0, // Valor padrão para o limite mínimo da barra (em pixels)
}: StackedBarChartProps) => {
  const totalHeight = data.length <= 5 ? 400 : data.length * heightPerCategory;

  // Função para criar um mapa de porcentagens
  const percentageMap: Record<string, number> = percentages?.data.reduce((acc, item) => {
    if (item[percentages.keyField] && item[percentages.valueField]) {
      acc[String(item[percentages.keyField])] = item[percentages.valueField];
    }
    return acc;
  }, {}) || {};

  // Calcula o valor máximo total das barras (soma de importacao e exportacao)
  const maxValue = data.reduce((max, entry) => {
    const totalValue =
      typeof entry["importacao"] === "number" && typeof entry["exportacao"] === "number"
        ? entry["importacao"] + entry["exportacao"]
        : 0;
    return Math.max(max, totalValue);
  }, 0);

  return (
    <div className="relative bg-white w-full">
      <h3 className="text-center mb-8 font-semibold">{title}</h3>
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
                {data.map((dataIndex) => (
                  <Cell
                    key={`cell-${dataIndex}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
                {barConfig.showPercentage && percentages && (
                  <LabelList
                    dataKey={(entry: DataEntry) => {
                      const identifier = entry[xKey];
                      const percentage = percentageMap[String(identifier)];

                      // Calcula o tamanho total da barra (soma de importacao e exportacao)
                      const totalBarValue =
                        typeof entry["importacao"] === "number" &&
                        typeof entry["exportacao"] === "number"
                          ? entry["importacao"] + entry["exportacao"]
                          : 0;

                      // Calcula o tamanho visual da barra (proporcional ao valor máximo)
                      const visualBarWidth = (totalBarValue / maxValue) * 100; // Em %

                      // Verifica se o tamanho visual da barra é suficiente para exibir o valor
                      if (
                        typeof visualBarWidth === "number" &&
                        visualBarWidth >= minBarWidth &&
                        typeof percentage === "number"
                      ) {
                        return `${percentage.toFixed(2)}%`;
                      }

                      return ""; // Não exibe o valor se a barra for muito pequena
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