import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from "recharts";

const VerticalScrollableBarChart = ({
  data,
  title,
  xKey,
  bars,
  colors = [],
  yAxisFormatter = (value: number) => value,
  tooltipFormatter = (value: number) => value,
  heightPerCategory = 50, // Altura de cada barra
  visibleHeight = 400, // Altura visível do gráfico
}: any) => {

  // Calcula a altura total com base no número de categorias
  let totalHeight = data.length * heightPerCategory;

  //If para terminar uma espécie de "altura mínima"
  if(data.length <= 5) totalHeight = 300;

  return (
    <div className="relative bg-white w-full p-4">
      <h3 className="text-center mb-4 font-semibold">{title}</h3>

      {/* Wrapper para scroll vertical */}
      <div
        className="overflow-y-auto" // Scroll somente na vertical
        style={{ height: `${visibleHeight}px` }} // Define a altura visível
      >
        <div style={{ height: `${totalHeight}px`, width: "100%" }}> {/* Altura total */}
          <RechartsBarChart
            data={data}
            layout="vertical" // Configura barras verticais
            height={totalHeight} // Altura total do gráfico
            width={500} // Largura fixa para evitar scroll horizontal
            margin={{ top: 20, right: -50, left: -30, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              tickFormatter={yAxisFormatter}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              type="category"
              dataKey={xKey}
              tick={{ fontSize: 12 }}
              interval={0} // Mostra todos os rótulos
              width={150} // Espaço suficiente para rótulos longos
            />
            <Tooltip formatter={tooltipFormatter} />
            <Legend />
            {bars.map((bar: any, index: any) => (
              <Bar
                key={index}
                dataKey={bar.dataKey}
                name={bar.name}
              >
                {data.map((entry: any, dataIndex: any) => {
                  const color =
                    entry[xKey] === "Recife" ? colors[index % colors.length + 1] : colors[index % colors.length]; // Cor condicional
                  return <Cell key={`cell-${dataIndex}`} fill={color} />;
                })}
              </Bar>
            ))}
          </RechartsBarChart>
        </div>
      </div>
    </div>
  );
};

export default VerticalScrollableBarChart;
