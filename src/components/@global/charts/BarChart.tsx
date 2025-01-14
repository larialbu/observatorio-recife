import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { tooltipFormatter, yAxisFormatter } from "@/utils/formatters/@global/graphFormatter";
import CustomTooltip from "../features/CustomTooltip";
import CustomLegend from "../features/CustomLegend";

const BarChart = ({ 
  data, 
  title, 
  colors, 
  xKey, 
  bars,
  tooltipEntry
}: any) => {

  const customTooltipFormatter = (value: any) => {
      return tooltipFormatter(value, tooltipEntry || "");
    };

    return (
      <div className="relative w-full h-full">
        <h3 className="text-center mb-4 font-semibold">{title}</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RechartsBarChart data={data} margin={{ top: 20, right: 20, left: 13, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey={xKey} 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
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
    );
};

export default BarChart;
