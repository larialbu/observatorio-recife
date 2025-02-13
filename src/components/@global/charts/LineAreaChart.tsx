import React from 'react';
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

import { tooltipFormatter, yAxisFormatter } from "@/utils/formatters/@global/graphFormatter";
import CustomTooltip from "../features/CustomTooltip";
import CustomLegend from "../features/CustomLegend";


const LineAreaChart = ({
  data,
  title,
  xKey,
  areaKeys,
  colors,
  tooltipEntry
}: any) => {
  const gradientOffset = (dataKey: string) => {
    const dataMax = Math.max(...data.map((i: any) => i[dataKey]));
    const dataMin = Math.min(...data.map((i: any) => i[dataKey]));

    if (dataMax <= 0) return 0;
    if (dataMin >= 0) return 1;

    return dataMax / (dataMax - dataMin);
  };

  const customTooltipFormatter = (value: any) => {
    return tooltipFormatter(value, tooltipEntry || "");
  };

  return (
    <div className="relative bg-white w-full h-full">
      <h3 className="text-center font-semibold">{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <RechartsAreaChart
          data={data}
          margin={{ top: 20, right: 20, left: 23, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "#333" }} />
          <YAxis tick={{ fontSize: 11, fill: "#333" }} />
          <Tooltip
            content={(e) => CustomTooltip({...e, customTooltipFormatter})}
          />
          <Legend />
          {/* <Legend 
            verticalAlign="top" 
            align="center"
            content={({ payload }) => <CustomLegend payload={payload} />}
            iconSize={20}
          /> */}
          
          {areaKeys.map((key: any, index: any) => {
            const off = gradientOffset(key);
            const color = colors[index % colors.length];
            
            return (
                <React.Fragment key={key}>
                <defs>
                    <linearGradient id={`splitColor-${key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset={off} stopColor={color} stopOpacity={1} />
                      <stop offset={off} stopColor="red" stopOpacity={1} />
                    </linearGradient>
                </defs>
                <Area
                    type="monotone"
                    dataKey={key}
                    stroke={color}
                    fill={`url(#splitColor-${key})`}
                    name={key}
                />
                </React.Fragment>
            );
            })}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineAreaChart;