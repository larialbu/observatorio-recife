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
import { NavigationChart } from "../../NavigationChart";
import ChartGrabber from "../../ChartGrabber";

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

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
      <NavigationChart to="/observatorio/ipca">
        <ChartGrabber left>
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
                name="PIB per capita"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartGrabber>{" "}
      </NavigationChart>
    </div>
  );
};
