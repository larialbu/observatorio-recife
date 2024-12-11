import React, { useState, useEffect, ReactNode } from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Text,
} from "recharts";

const PieChart = ({
  data,
  title,
  underTitle,
  dataKey,
  nameKey,
  colors = [],
  showPercentages = true,
}: {
  data: any;
  title: string;
  underTitle?: ReactNode;
  dataKey: string;
  nameKey: string;
  colors: string[];
  showPercentages: boolean;
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

  return (
    <div className="relative bg-white w-full h-full p-4">
      <h3 className="text-center mb-4 font-semibold">{title}</h3>
      {underTitle}
      <ResponsiveContainer width="100%" height={300}>
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
            formatter={(value: number) => `${value.toLocaleString("pt-BR")} kg`}
          />
        </RechartsPieChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap justify-center mt-4 gap-2">
        {data.map((entry: any, index: any) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            ></span>
            <span className="text-sm">{entry[nameKey]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
