"use client";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Total",
    count: 106,
    fill: "white",
  },
  {
    name: "Girls",
    count: 53,
    fill: "#52B348", // Laranja escuro
  },
  {
    name: "Boys",
    count: 53,
    fill: "#0F4C75", // Azul escuro
  },
];

interface CountChartProps {
  title: string; // Define o tipo para a prop 'title'
}

const CountChart: React.FC<CountChartProps> = ({ title }) => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold text-[#0F4C75]">{title}</h1> {/* Azul escuro */}
      </div>
      {/* CHART */}
      <div className="relative w-full h-[75%] bg-[#f5f5f5]"> {/* Fundo cinza claro */}
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" fill="#ccc" /> {/* Fundo do gráfico em cinza */}
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-[#0F4C75] rounded-full" /> {/* Azul escuro */}
          <h1 className="font-bold text-[#0F4C75]">{data[2].count}</h1> {/* Número de meninos */}
          <h2 className="text-xs text-[#0F4C75]">HOMENS ({((data[2].count / data[0].count) * 100).toFixed(0)}%)</h2> {/* Azul escuro para o texto */}
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-[#52B348] rounded-full" /> {/* Laranja escuro */}
          <h1 className="font-bold text-[#52B348]">{data[1].count}</h1> {/* Número de meninas */}
          <h2 className="text-xs text-[#52B348]">MULHERES ({((data[1].count / data[0].count) * 100).toFixed(0)}%)</h2> {/* Laranja escuro para o texto */}
        </div>
      </div>
    </div>
  );
};

export default CountChart;
