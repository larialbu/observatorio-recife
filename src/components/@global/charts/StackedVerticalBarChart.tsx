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

const StackedBarChart = ({
  data,
  title,
  xKey,
  bars,
  colors = [],
  heightPerCategory = 50,
  visibleHeight = 300,
  tooltipEntry,
  left = -35,
  yFontSize = 12,
  showPercentages = false,
  percentages = [], // Array de objetos com { [xKey]: string, totalPercentual: number }
}: any) => {
  // Calcula altura total
  let totalHeight = data.length * heightPerCategory;
  if (data.length <= 5) totalHeight = 400;

  const percentageMap = percentages.reduce((acc: Record<string, number>, item: any) => {
    if (item[xKey] && item.totalPercentual) {
      acc[item[xKey]] = item.totalPercentual;
    }
    return acc;
  }, {});

  // Formatação do tooltip
  const customTooltipFormatter = (value: any) => {
    return tooltipFormatter(value, tooltipEntry || "");
  };

  return (
    <div className="relative bg-white w-full">
      <h3 className="text-center mb-[2em] font-semibold">{title}</h3>
      <div
        className="overflow-y-auto overflow-x-visible"
        style={{ height: `${visibleHeight}px` }}
      >
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
            />
            <YAxis
              type="category"
              dataKey={xKey}
              tick={{ fontSize: yFontSize }}
              interval={0}
              width={150}
            />
            <Tooltip content={(e) => CustomTooltip({ ...e, customTooltipFormatter })} />
            <Legend
              verticalAlign="top"
              align="center"
              content={({ payload }) => (
                <div className="flex justify-center ml-10 mt-2">
                  <div className="w-[90%]">
                    <CustomLegend payload={payload} />
                  </div>
                </div>
              )}
              iconSize={20}
            />
            {bars.map((bar: any, index: any) => (
              <Bar
                key={index}
                dataKey={bar.dataKey}
                name={bar.name}
                stackId="stack"
                fill={colors[index]}
                {...(showPercentages && bar.name === "Importação" && {
                  label: {
                    position: "insideRight", 
                    fill: "#fff",
                    fontSize: 12,
                    fontWeight: "semibold",
                    formatter: () => {
                      return percentageMap; 
                    },
                  },
                })}
              >
                {data.map((entry: any, dataIndex: any) => {
                  const color =
                    entry[xKey] === "Recife"
                      ? colors[(index % colors.length) + 1]
                      : colors[index % colors.length];
                  return <Cell key={`cell-${dataIndex}`} fill={color} />;
                })}
              </Bar>
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StackedBarChart;