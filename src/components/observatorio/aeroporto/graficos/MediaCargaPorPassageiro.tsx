import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// abreviando os nomes de natureza e grupo de voo
const abbreviateNaturezaGrupo = (name: string) => {
  const abbreviations: { [key: string]: string } = {
    'REGULAR': 'REG',
    'NÃO REGULAR': 'NÃO REG',
    'IMPRODUTIVO': 'IMPR',
  };

  return abbreviations[name] || name;
};

// formatar os números com separadores de milhares (sem casas decimais)
const formatNumber = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const MediaCargaPorPassageiro = ({ data = [], title = "", colors = ["#EC6625", "#0155AE"] }: any) => {
  const [windowWidth, setWindowWidth] = useState(768); // valor inicial padrão
  const [showAbbreviations, setShowAbbreviations] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const processedData = data.reduce((acc: any, item: any) => {
    const natureza = item["NATUREZA"];
    const grupoDeVoo = item["GRUPO DE VOO"];
    const passageiros = Number(item["PASSAGEIROS PAGOS"]) + Number(item["PASSAGEIROS GRÁTIS"]) || 0;
    const carga = Number(item["CARGA PAGA (KG)"]) + Number(item["CARGA GRÁTIS (KG)"]) || 0;

    if (!acc[grupoDeVoo]) {
      acc[grupoDeVoo] = { grupoDeVoo, internacional: 0, domestica: 0, countInternacional: 0, countDomestica: 0 };
    }

    if (natureza === 'INTERNACIONAL') {
      acc[grupoDeVoo].internacional += carga;
      acc[grupoDeVoo].countInternacional += passageiros;
    } else if (natureza === 'DOMÉSTICA') {
      acc[grupoDeVoo].domestica += carga;
      acc[grupoDeVoo].countDomestica += passageiros;
    }

    return acc;
  }, {});

  const chartData = Object.values(processedData).map((item: any) => ({
    name: windowWidth < 768 || showAbbreviations
      ? abbreviateNaturezaGrupo(item.grupoDeVoo)
      : item.grupoDeVoo,
    fullName: item.grupoDeVoo,
    internacional: item.countInternacional > 0 ? item.internacional / item.countInternacional : 0,
    domestica: item.countDomestica > 0 ? item.domestica / item.countDomestica : 0,
  }));

  const renderExplanation = () => (
    <div className="text-center text-sm text-gray-600 mt-2">
      <strong>Abreviações:</strong>
      <ul>
        {chartData.map((item: any) => (
          <li key={item.name}>
            {item.name}: {item.fullName}
          </li>
        ))}
      </ul>
    </div>
  );

  const tickFontSize = windowWidth < 768 ? 8 : windowWidth <= 1120 ? 10 : 12;

  return (
    <div>
      <h3 className="text-center mb-4 font-semibold">{title}</h3>

      <div className="text-center mb-4">
        <button
          onClick={() => setShowAbbreviations(!showAbbreviations)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showAbbreviations ? 'Ocultar Abreviações' : 'Mostrar Abreviações'}
        </button>
      </div>

      {showAbbreviations && renderExplanation()}

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 20, left: 30, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: tickFontSize }} />
          <YAxis tickFormatter={formatNumber} />
          <Tooltip formatter={(value: number) => formatNumber(value)} />
          <Legend />
          <Bar dataKey="internacional" fill={colors[0]} name="Internacional" />
          <Bar dataKey="domestica" fill={colors[1]} name="Doméstica" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MediaCargaPorPassageiro;
