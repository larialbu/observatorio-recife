import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// formatar números com separador de milhares e sem casas decimais
const formatNumber = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
};

const MediaViagensPorMes = ({ data, dataKey, nameKey, colors, title, year }: any) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const processedData = data.reduce((acc: any, item: any) => {
    const mes = item[nameKey];
    const passageiros = Number(item[dataKey]) || 0;
    const itemAno = item["ANO"];

    // filtrar pelo ano
    if (itemAno !== year) {
      return acc;
    }

    if (!acc[mes]) {
      acc[mes] = { mes, total: 0, count: 0 };
    }

    acc[mes].total += passageiros;
    acc[mes].count += 1;

    return acc;
  }, {});

  // média das viagens por mês
  const chartData = Object.values(processedData).map((item: any) => ({
    mes: item.mes,
    media: Math.round(item.total / item.count),
  }));

  // ajustando o eixo Y
  const minValue = Math.min(...chartData.map((item: any) => item.media));
  const minTick = minValue * 0.95;

  // definir tamanho da fonte com base no width da página
  const tickFontSize = windowWidth < 768 ? 8 : windowWidth <= 1120 ? 10 : 12;

  return (
    <div>
      <h3 className="text-center mb-4 font-semibold">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          
          <XAxis 
            dataKey="mes" 
            tick={{ fontSize: tickFontSize }} 
          />

          <YAxis 
            domain={[minTick, 'auto']} 
            tick={{ fontSize: tickFontSize }}
          />
          <Tooltip formatter={(value: any) => formatNumber(value)} />

          <Legend />

          <Line 
            type="monotone" 
            dataKey="media" 
            stroke={colors[0]}
            strokeWidth={3}
            name="Média de Viagens" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MediaViagensPorMes;
