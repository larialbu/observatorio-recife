import React, { useEffect, useState } from "react";
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
import ChartGrabber from "../../ChartGrabber";

// Função para formatar números. Use esta ou substitua por outra, conforme necessário

const formatNumber = (value: any) => {
  return `${value.toFixed(2).replace(".", ",")} %`;
};

interface DataItem {
  month: string;
  uv: number;
  pv: number;
  total: number;
}

function renameDuplicates(data: DataItem[]): DataItem[] {
  const nameCount: Record<string, number> = {}; // Objeto para contar as ocorrências de cada mês

  return data.map((item) => {
    const { month } = item;

    // Incrementa o contador para o nome atual, ou define como 1 se for a primeira ocorrência
    if (nameCount[month]) {
      nameCount[month]++;
      item.month = `${month}${nameCount[month]}`; // Adiciona o sufixo numérico
    } else {
      nameCount[month] = 1;
    }

    return item;
  });
}

export const RadarGraph = ({
  title,
  chartData,
  type,
}: {
  title: string;
  chartData?: { month: string; uv: number; pv?: number; total?: number }[];
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

  const data = renameDuplicates(chartData as DataItem[]);

  return (
    <div>
      <ChartGrabber>
        <h3 className="text-center mb-4 font-semibold">{title}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis tick={{ fontSize: tickFontSize }} dataKey="month" />
            <PolarRadiusAxis
              tick={{ fontSize: tickFontSize }}
              angle={30}
              domain={[0, 10]}
            />
            <Tooltip formatter={(value: any) => formatNumber(value)} />
            {/* <Radar
            name="Importação"
            dataKey="uv"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          /> */}
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
