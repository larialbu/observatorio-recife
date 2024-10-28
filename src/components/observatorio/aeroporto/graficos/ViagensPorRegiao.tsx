import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// formatar números com separador de milhares e casas decimais
const formatNumber = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(value);
};

const ViagensPorRegiao = ({ data, nameKey, colors, title, year }: any) => {
  const [showPercentage, setShowPercentage] = useState(true);

  const processedData = data.reduce((acc: any, item: any) => {
    const regiao = item[nameKey];
    const viagens = Number(item["PASSAGEIRO"]) || 0;
    const ano = item["ANO"];

    // filtrar pelo ano
    if (ano !== year) {
      return acc;
    }
    
    if (!acc[regiao]) {
      acc[regiao] = { regiao, viagens: 0, count: 0 };
    }
    acc[regiao].viagens += viagens;
    acc[regiao].count += 1;
    return acc;
  }, {});

  // calcula o total para as porcentagens
  const totalViagens = Object.values(processedData)
    .reduce((sum: number, item: any) => sum + item.viagens, 0);
  
  const totalMedia = Object.values(processedData)
    .reduce((sum: number, item: any) => sum + (item.viagens / item.count), 0);

  // Dados para a legenda
  const legendData = Object.values(processedData)
    .map((item: any) => ({
      name: item.regiao,
      value: item.viagens,
      color: colors[Object.keys(processedData).indexOf(item.regiao) % colors.length]
    }))
    .filter(item => item.value > 0);

  // dados para o círculo interno (total de passageiros)
  const innerCircleData = legendData.map(item => ({
    name: item.name,
    value: item.value,
    percentage: ((item.value / totalViagens) * 100).toFixed(1)
  }));

  // dados para o círculo externo (média de passageiros)
  const outerCircleData = legendData.map(item => {
    const original = processedData[item.name];
    const mediaValue = Number((original.viagens / original.count).toFixed(2));
    return {
      name: item.name,
      value: mediaValue,
      percentage: ((mediaValue / totalMedia) * 100).toFixed(1)
    };
  });

  // Função que renderiza a porcentagem dentro das fatias, responsivamente
  const renderResponsiveLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, index } = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // calcula o tamanho do texto com base no percentual da fatia
    const textSize = Math.max(10, (percent * 100) * 0.5);  // tamanho mínimo de 10px e cresce com o tamanho da fatia

    // esconde o texto se o percentual for menor que 5%
    if (percent < 0.05) return null;

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor="middle"
        dominantBaseline="central"
        style={{ fontSize: `${textSize}px`, opacity: 0.6 }}
        className='pointer-events-none'
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  // Custom Tooltip para exibir o número formatado
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="font-semibold">{payload[0].name}</p>
          <p>Total: {formatNumber(payload[0].value)}</p>
          <p>Porcentagem: {payload[0].payload.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <h3 className="text-center mb-4 font-semibold">{title}</h3>

      {/* Botão para alternar a exibição da porcentagem */}
      <div className="text-center mb-4">
        <button
          onClick={() => setShowPercentage(!showPercentage)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showPercentage ? 'Ocultar Porcentagens' : 'Mostrar Porcentagens'}
        </button>
      </div>

      <div className="text-center mb-2">
        <div className="text-sm text-gray-600">
          Círculo interno: Total de passageiros por região
        </div>
        <div className="text-sm text-gray-600">
          Círculo externo: Média de passageiros por região/mês
        </div>
      </div>


      <div style={{ position: 'relative', width: '100%', height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* círculo interno - total de passageiros */}
            <Pie
              data={innerCircleData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
              label={showPercentage ? renderResponsiveLabel : undefined}
              labelLine={false}
            >
              {innerCircleData.map((entry: any, index: number) => (
                <Cell 
                  key={`cell-inner-${index}`} 
                  fill={legendData[index].color}
                />
              ))}
            </Pie>
            
            {/* círculo externo - média de passageiros */}
            <Pie
              data={outerCircleData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              fill="#82ca9d"
              label={showPercentage ? renderResponsiveLabel : undefined}
              labelLine={false}
            >
              {outerCircleData.map((entry: any, index: number) => (
                <Cell 
                  key={`cell-outer-${index}`} 
                  fill={legendData[index].color}
                />
              ))}
            </Pie>
            
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              payload={legendData.map(item => ({
                value: item.name,
                type: 'circle',
                color: item.color,
              }))}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ViagensPorRegiao;
