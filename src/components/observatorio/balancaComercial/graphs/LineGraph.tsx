import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const LineGraph = ({
  title,
  chartData,
  type,
}: {
  title: string;
  chartData?: {
    month: string;
    uv?: number;
    pv?: number;
    amt?: number;
  }[];
  type?: string;
}) => {
  return (
    <div>
      <h3 className="text-center mb-4 font-semibold">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            name={type == "recife" ? "recife" : "pv"}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          {chartData && chartData[0]?.uv == 0 ? (
            ""
          ) : (
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
