import React, { PureComponent, useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { formatNumber } from "../functions/formatNumber";
import ChartGrabber from "../../ChartGrabber";

export const RadarGraph = ({
  title,
  chartData,
  type,
}: {
  title: string;
  chartData?: { month: string; uv: number; pv?: number; total: number }[];
  type?: string;
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
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis tick={{ fontSize: tickFontSize }} dataKey="month" />
            <PolarRadiusAxis
              tick={{ fontSize: tickFontSize }}
              angle={30}
              domain={[0, 150]}
            />
            <Tooltip formatter={(value: any) => formatNumber(value)} />
            <Radar
              name="Importação"
              dataKey="uv"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Radar
              name="exportação"
              dataKey="pv"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </ChartGrabber>
    </div>
  );
};
