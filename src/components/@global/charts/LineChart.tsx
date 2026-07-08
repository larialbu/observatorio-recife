import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { tooltipFormatter, yAxisFormatter } from "@/utils/formatters/@global/graphFormatter";

import CustomLegend from "../features/CustomLegend";
import CustomTooltip from "../features/CustomTooltip";

const LineChart = ({
  data,
  title,
  xKey,
  yAxis,
  lines,
  colors = [],
  tooltipEntry,
  height = 340,

}: any) => {

  const customTooltipFormatter = (value: any) => {
    return tooltipFormatter(value, tooltipEntry || "");
  };

  return (
    <div className="relative bg-white w-full h-full dark:bg-[#0C1B2B]">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-center font-semibold w-[90%] text-gray-800 dark:text-gray-100">{title}</h3>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart
          data={data}
          margin={{ top: 20, right: 30, left: 23, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "var(--yaxis-tick-color)" }} />
          <YAxis
            domain={[(dataMin: number) => parseFloat((dataMin * 0.98).toFixed(2)), (dataMax: number) => parseFloat((dataMax * 1.01).toFixed(2))]}
            tick={{ fontSize: 11, fill: "var(--yaxis-tick-color)" }}
            tickFormatter={yAxisFormatter}
            {...yAxis}
          />
          <Tooltip
            content={(e) => CustomTooltip({...e, customTooltipFormatter})}
          />
          <Legend
            verticalAlign="top"
            align="center"
            content={({ payload }) => <CustomLegend payload={payload} />}
            iconSize={20}
          />
          {lines.map((line: any, index: any) => (
            <Line
              key={index}
              type={line.type || "monotone"}
              dataKey={line.dataKey}
              stroke={colors[index] || "#000"}
              strokeWidth={line.strokeWidth || 3}
              dot={line.showDots !== false ? { r: 5, strokeWidth: 2, stroke: colors[index] || "#000", fill: "#fff" } : false}
              activeDot={{ r: 7 }}
              name={line.name}
              connectNulls
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
