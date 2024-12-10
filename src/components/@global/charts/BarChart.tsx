import React from "react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const BarChart = ({ data, title, colors, xKey, bars }: any) => {
    return (
      <div className="relative bg-white">
        <h3 className="text-center mb-4 font-semibold">{title}</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RechartsBarChart data={data} margin={{ top: 20, right: 20, left: 30, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {bars.map((bar: any, index: any) => (
              <Bar key={index} dataKey={bar.dataKey} fill={colors[index]} name={bar.name} />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default BarChart;