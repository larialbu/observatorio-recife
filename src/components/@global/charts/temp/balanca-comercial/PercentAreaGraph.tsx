import React, { PureComponent, useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatNumber } from "../../../../../functions/process_data/observatorio/balanca-comercial/formatNumber";
import ChartGrabber from "../../../../observatorio/ChartGrabber";

const toPercent = (decimal: any, fixed = 0) =>
  `${(decimal * 100).toFixed(fixed)}%`;

const getPercent = (value: any, total: any) => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio, 2);
};

const renderTooltipContent = (o: any) => {
  const { payload, label } = o;
  const total = payload.reduce(
    (result: any, entry: any) => result + entry.value,
    0
  );

  return (
    <div className="customized-tooltip-content bg-white p-2 rounded">
      <p className="total">{`${label} (Total: ${formatNumber(total)})`}</p>
      <ul className="list">
        {payload.map((entry: any, index: any) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${formatNumber(entry.value)}(${getPercent(
              entry.value,
              total
            )})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const PercentAreaChart = ({
  title,
  chartData,
  type,
}: {
  title: string;
  chartData?: {
    month: string;
    pv: number;
    uv: number;
    c?: number;
  }[];
  type?: string;
}) => {
  const [windowWidth, setWindowWidth] = useState(768);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const tickFontSize = windowWidth < 768 ? 8 : windowWidth <= 1120 ? 10 : 10;

  return (
    <div>
      <ChartGrabber>
        <h3 className="text-center mb-4 font-semibold">{title}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            width={500}
            height={400}
            data={chartData}
            stackOffset="expand"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tick={{ fontSize: tickFontSize }} dataKey="month" />
            <YAxis
              tick={{ fontSize: tickFontSize }}
              tickFormatter={(val: any) => toPercent(val, 0)}
            />
            <Tooltip
              formatter={(value: any) => formatNumber(value)}
              content={renderTooltipContent}
            />
            <Area
              type="monotone"
              name={type == "balanca" ? "importação" : ""}
              dataKey="pv"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              name={type == "balanca" ? "exportação" : ""}
              dataKey="uv"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="c"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartGrabber>
    </div>
  );
};
