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

import CustomLegend from "../features/CustomLegend";
import CustomTooltip from "../features/CustomTooltip";


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
    <div className="relative bg-white dark:bg-[#0C1B2B] w-full h-full">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-center font-semibold w-[90%] text-gray-800 dark:text-gray-200">{title}</h3>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <RechartsAreaChart
          data={data}
          margin={{ top: 20, right: 20, left: 23, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "var(--yaxis-tick-color)" }}/>
          <YAxis tick={{ fontSize: 11, fill: "var(--yaxis-tick-color)" }} />
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