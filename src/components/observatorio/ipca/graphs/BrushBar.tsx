import React, { PureComponent, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "1", uv: 300, pv: 456 },
  { name: "2", uv: -145, pv: 230 },
  { name: "3", uv: -100, pv: 345 },
  { name: "4", uv: -8, pv: 450 },
  { name: "5", uv: 100, pv: 321 },
  { name: "6", uv: 9, pv: 235 },
  { name: "7", uv: 53, pv: 267 },
  { name: "8", uv: 252, pv: -378 },
  { name: "9", uv: 79, pv: -210 },
  { name: "10", uv: 294, pv: -23 },
  { name: "11", uv: 43, pv: 45 },
  { name: "12", uv: 43, pv: 45 },
];

export const BrushBar = ({ title }: { title: string }) => {
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
      <h3 className="text-center mb-4 font-semibold">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis tick={{ fontSize: tickFontSize }} dataKey="name" />
          <YAxis tick={{ fontSize: tickFontSize }} />
          <Tooltip />
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
          <ReferenceLine y={0} stroke="#000" />
          {/* <Brush dataKey="name" height={30} stroke="#8884d8" /> */}
          <Bar dataKey="pv" fill="#8884d8" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
