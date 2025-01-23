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
import CustomTooltip from "../features/CustomTooltip";
import CustomLegend from "../features/CustomLegend";

const LineChart = ({
  data,
  title,
  xKey,
  lines,
  colors = [],
  tooltipEntry

}: any) => {

  const customTooltipFormatter = (value: any) => {
    return tooltipFormatter(value, tooltipEntry || "");
  };

  return (
    <div className="relative bg-white w-full h-full">
      <h3 className="text-center font-semibold">{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <RechartsLineChart
          data={data}
          margin={{ top: 20, right: 20, left: 23, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "#333" }} />
          <YAxis
            tick={{ fontSize: 11, fill: "#333" }}
            tickFormatter={yAxisFormatter}
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
              strokeWidth={line.strokeWidth || 2}
              dot={line.showDots !== false}
              name={line.name}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
