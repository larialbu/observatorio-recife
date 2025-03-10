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
}: StackedBarChartProps) => {
  const totalHeight = data.length <= 5 ? 400 : data.length * heightPerCategory;

  const percentageMap: Record<string, number> = percentages?.data.reduce((acc, item) => {
    if (item[percentages.keyField] && item[percentages.valueField]) {
      acc[String(item[percentages.keyField])] = item[percentages.valueField];
    }
    return acc;
  }, {}) || {};

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
            {/* Tooltip corrigido */}
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
                      return percentage ? `${percentage.toFixed(2)}%` : "";
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