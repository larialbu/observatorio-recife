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
import { formatNumber } from "../functions/formatNumber";
import ChartGrabber from "../../ChartGrabber";

export const BarSimpleChart = ({
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
  const [windowWidth, setWindowWidth] = useState(768); // valor padrão para largura da tela

  useEffect(() => {
    // Verificar se `window` está disponível no ambiente de execução
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setWindowWidth(window.innerWidth);
      }
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth); // Inicializar o valor no cliente
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const tickFontSize = windowWidth < 768 ? 10 : windowWidth <= 1120 ? 12 : 14;

  return (
    <div>
      <ChartGrabber>
        <h3 className="text-center mb-4 font-semibold">{title}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            layout="vertical"
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
              tickFormatter={formatNumber}
              tick={{ fontSize: tickFontSize }}
              type="number"
            />
            <YAxis
              tick={{ fontSize: tickFontSize }}
              type="category"
              dataKey="month"
            />
            <Tooltip formatter={(value: any) => formatNumber(value)} />
            <Legend />
            <Bar
              dataKey="pv"
              name={type == "balanca" ? "importação" : ""}
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="uv"
              name={type == "balanca" ? "exportação" : ""}
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartGrabber>
    </div>
  );
};
