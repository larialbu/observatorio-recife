import { useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import ChartGrabber from "../../../features/ChartGrabber";

// abreviando o nome das companhias
const abbreviateCompanyName = (name: string) => {
  const abbreviations: { [key: string]: string } = {
    "AZUL LINHAS AÉREAS BRASILEIRAS S/A": "Azul",
    "GOL LINHAS AÉREAS S.A. (EX- VRG LINHAS AÉREAS S.A.)": "Gol",
    "PASSAREDO TRANSPORTES AÉREOS S.A.": "Passaredo",
    "TAM LINHAS AÉREAS S.A.": "TAM",
    "ATA - AEROTÁXI ABAETÉ LTDA.": "ABAETÉ",
    "AZUL CONECTA LTDA. (EX TWO TAXI AEREO LTDA)": "Azul Conecta",
  };

  return abbreviations[name] || name;
};

// formatando os números com separadores de milhares (sem casas decimais)
const formatNumber = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const GraficoCompanhiasPopulares = ({ data, title, colors }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const processedData = data.reduce((acc: any, item: any) => {
    if (item["EMPRESA (NACIONALIDADE)"] === "BRASILEIRA") {
      const company = item["EMPRESA (NOME)"];
      const viagens = Number(item["DECOLAGENS"]) || 0;

      if (!acc[company]) {
        acc[company] = {
          name: abbreviateCompanyName(company),
          totalViagens: 0,
          count: 0,
        };
      }

      acc[company].totalViagens += viagens;
      acc[company].count += 1;
    }
    return acc;
  }, {});

  const chartData = Object.values(processedData)
    .map((item: any) => ({
      name: item.name,
      value: item.totalViagens,
    }))
    .sort((a: any, b: any) => b.value - a.value)
    .slice(0, 5);

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >
          {`${formatNumber(value)} viagens`}
        </text>
      </g>
    );
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative bg-white">
      <ChartGrabber>
        <h3 className="text-center mb-4 font-semibold">{title}</h3>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
              className="companhias"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => formatNumber(value)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartGrabber>
    </div>
  );
};

export default GraficoCompanhiasPopulares;
