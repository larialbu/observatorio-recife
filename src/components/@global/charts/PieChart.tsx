import { useState, useEffect, ReactNode } from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Text,
  Legend,
} from "recharts";

import { tooltipFormatter } from "@/utils/formatters/@global/graphFormatter";
// import CustomLegend from "../features/CustomLegends";
import CustomLegend from "../features/CustomLegend";
import CustomTooltip from "../features/CustomTooltip";

const PieChart = ({
  data,
  title,
  underTitle,
  dataKey,
  nameKey,
  colors = [],
  tooltipEntry,
  showPercentages = true,

}: {
  data: any;
  title: string;
  underTitle?: ReactNode;
  dataKey: string;
  nameKey: string;
  colors: string[];
  showPercentages: boolean;
  tooltipEntry: string;
}) => {
  const [outerRadius, setOuterRadius] = useState(120);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setOuterRadius(80);
      } else if (width >= 768 && width < 1024) {
        setOuterRadius(100);
      } else {
        setOuterRadius(120);
      }
    };

    handleResize(); // Ajusta inicialmente
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <Text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-sm pointer-events-none"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </Text>
    );
  };

  const customTooltipFormatter = (value: any) => {
      return tooltipFormatter(value, tooltipEntry || "");
  };

  return (
    <div className="relative bg-white w-full h-full">
      <h3 className="text-center mb-4 font-semibold">{title}</h3>
      <div className="mb-2">
      {underTitle}
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <RechartsPieChart>
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            outerRadius={outerRadius} // Valor dinâmico
            label={showPercentages ? renderCustomizedLabel : undefined}
            labelLine={false}
          >
            {data.map((entry: any, index: any) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip
              content={(e) => CustomTooltip({...e, customTooltipFormatter})}
            />
            <Legend 
                  verticalAlign="top" 
                  align="center"
                  content={({ payload }) => <CustomLegend payload={payload} noBorder />}
                  iconSize={20}
                />
        </RechartsPieChart>
      </ResponsiveContainer>
      {/* <CustomLegend
        dataSetter={data}
        colors={colors}
        nameKey={nameKey}
      /> */}
    </div>
  );
};

export default PieChart;
