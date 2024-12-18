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
import { formatVal } from "../functions/formatVal";
import ChartGrabber from "../../ChartGrabber";

export const BarGraph = ({
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
              tickFormatter={formatVal}
              tick={{ fontSize: tickFontSize }}
              type="number"
            />
            <YAxis
              tick={{ fontSize: tickFontSize }}
              type="category"
              dataKey="month"
            />
            <Tooltip formatter={(value: any) => formatVal(value)} />
            <Legend />
            <Bar
              dataKey="pv"
              name={type == "balanca" ? "IPCA" : ""}
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          </BarChart>
        </ResponsiveContainer>{" "}
      </ChartGrabber>
    </div>
  );
};
