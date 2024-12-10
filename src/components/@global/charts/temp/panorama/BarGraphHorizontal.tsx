import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { NavigationChart } from "../../../../observatorio/NavigationChart";
import ChartGrabber from "../../../../observatorio/ChartGrabber";

export const formatNumber = (value: any) => {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const BarGraphHorizontal = ({
  title,
  chartData,
  type,
}: {
  title: string;
  chartData?: {
    month: string;
    uv: number;
    pv?: number;
    amt?: number;
  }[];
  type: string;
}) => {
  const [windowWidth, setWindowWidth] = useState(768);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setWindowWidth(window.innerWidth);
      }
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const tickFontSize = windowWidth < 768 ? 10 : windowWidth <= 1120 ? 11 : 11;

  return (
    <div>
      <NavigationChart to="/observatorio/aeroportos">
        {" "}
        <ChartGrabber left>
          <h3 className="text-center mb-4 font-semibold">{title}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              layout="horizontal"
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
              <XAxis
                // tickFormatter={formatNumber}
                tick={{ fontSize: tickFontSize }}
                type="category" // Tipo do eixo Y é categórico para o gráfico horizontal
                dataKey="month"
              />
              <YAxis
                tickFormatter={formatNumber}
                tick={{ fontSize: tickFontSize }}
                type="number" // Tipo do eixo X é numérico para o gráfico horizontal
              />
              <Tooltip formatter={(value: any) => formatNumber(value)} />
              <Legend />
              <Bar
                dataKey="pv"
                name="passageiros"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="uv"
                name="cargas"
                fill="#82ca9d"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartGrabber>{" "}
      </NavigationChart>
    </div>
  );
};
