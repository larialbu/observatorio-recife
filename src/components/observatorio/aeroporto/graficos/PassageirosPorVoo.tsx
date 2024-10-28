import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Text } from 'recharts';

// formatar os números com separadores de milhares (sem casas decimais)
const formatNumber = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const PassageirosPorVoo = ({ data, dataKey, nameKey, colors, title }: any) => {
  const [showPercentages, setShowPercentages] = useState(true);

  const processedData = data.reduce((acc: any, item: any) => {
    const key = item[nameKey];
    const value = Number(item[dataKey]) || 0;

    if (!acc[key]) {
      acc[key] = { [nameKey]: key, [dataKey]: 0 };
    }

    acc[key][dataKey] += value;

    return acc;
  }, {});

  const chartData = Object.values(processedData);

  // renderizar as porcentagens dentro das fatias da pizza
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <Text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className='text-lg'>
        {`${(percent * 100).toFixed(1)}%`}
      </Text>
    );
  };

  return (
    <div>
      <h3 className="text-center mb-4 font-semibold">{title}</h3>

      {/* botão pra mostrar ou não as porcentagens */}
      <div className="text-center mb-4">
        <button
          onClick={() => setShowPercentages(!showPercentages)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showPercentages ? 'Ocultar Porcentagens' : 'Mostrar Porcentagens'}
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey={dataKey}
            nameKey={nameKey}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label={showPercentages ? renderCustomizedLabel : undefined}
            labelLine={false}
          >
            {chartData.map((entry: any, index: any) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => formatNumber(value)} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PassageirosPorVoo;
