import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { tooltipFormatter, yAxisFormatter } from "@/utils/formatters/@global/graphFormatter";

import CustomLegend from "../features/CustomLegend";
import CustomTooltip from "../features/CustomTooltip";

const HorizontalScrollableBarChart = ({ 
  data, 
  title, 
  colors, 
  xKey, 
  bars,
  widthMultiply,
  heightToPass,
  tooltipEntry
}: any) => {
  
  const customTooltipFormatter = (value: any) => {
      return tooltipFormatter(value, tooltipEntry || "");
    };

    return (
      <div className="relative w-full h-full">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-center mb-4 font-semibold w-[90%] text-gray-800 dark:text-gray-200">{title}</h3>
      </div>
        {/* Wrapper div with horizontal scroll */}
        <div className="overflow-x-auto">
          {/* Adding a larger width to the ResponsiveContainer */}
          <div style={{ width: data.length * widthMultiply + 'px' }}>
            <ResponsiveContainer width="100%" height={362}>
              <RechartsBarChart data={data} margin={{ top: 20, right: 20, left: 13, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey={xKey} 
                  tick={{ fontSize: 12, fill: "var(--yaxis-tick-color)" }}
                  orientation="top"
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: "var(--yaxis-tick-color)" }}
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
                {bars.map((bar: any, index: any) => (
                  <Bar key={index} dataKey={bar.dataKey} fill={colors[index]} name={bar.name} />
                ))}
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
};

export default HorizontalScrollableBarChart;
