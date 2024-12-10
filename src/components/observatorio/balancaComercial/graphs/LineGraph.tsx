import React, { PureComponent, useEffect, useState } from "react";
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
import { formatNumber } from "../../../../functions/observatorio/balanca-comercial/formatNumber";
import ChartGrabber from "../../ChartGrabber";

export const LineGraph = ({
  title,
  chartData,
  type,
  muni,
}: {
  title: string;
  chartData?: {
    month: string;
    uv?: number;
    pv?: number;
    amt?: number;
  }[];
  type?: string;
  muni?: string;
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
            <XAxis dataKey="month" tick={{ fontSize: tickFontSize }} />
            <YAxis
              tickFormatter={formatNumber}
              tick={{ fontSize: tickFontSize }}
            />
            <Tooltip formatter={(value: any) => formatNumber(value)} />
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
              <Line type="monotone" name={muni} dataKey="uv" stroke="#82ca9d" />
            )}
          </LineChart>
        </ResponsiveContainer>
      </ChartGrabber>
    </div>
  );
};
