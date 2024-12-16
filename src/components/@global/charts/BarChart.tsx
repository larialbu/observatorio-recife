import React from "react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const BarChart = ({ data, title, colors, xKey, bars }: any) => {

    return (
      <div className="relative w-full h-full">
        <h3 className="text-center mb-4 font-semibold">{title}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsBarChart data={data} margin={{ top: 20, right: 20, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
            dataKey={xKey} 
            tick={{ fontSize: 12 }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
            />
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
