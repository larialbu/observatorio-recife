import React from "react";
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

const LineChart = ({
  data,
  title,
  xKey,
  lines,
  colors = [],
  yAxisFormatter = (value: number) => value,
  tooltipFormatter = (value: any) => value,
}: any) => {
  return (
    <div className="relative bg-white w-full h-full">
      <h3 className="text-center mb-4 font-semibold">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart
          data={data}
          margin={{ top: 20, right: 20, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "#333" }} />
          <YAxis
            tick={{ fontSize: 12, fill: "#333" }}
            tickFormatter={yAxisFormatter}
          />
          <Tooltip formatter={tooltipFormatter} />
          <Legend />
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