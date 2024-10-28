import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EmbarqueDesembarqueRegiao = ({ data, nameKey, colors, title, year }: any) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    
    // isso aqui é pra realizar funções com base na largura da tela (ex: mudar o tamanho da fonte)
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const abbreviateRegion = (region: string) => {
    const abbreviations: { [key: string]: string } = {
      'NORTE': 'N',
      'NORDESTE': 'NE',
      'CENTRO-OESTE': 'CO',
      'SUDESTE': 'SE',
      'SUL': 'S',
    };
    return abbreviations[region] || region;
  };

  // filtrando os dados pelo ano
  const processedData = data.reduce((acc: any, item: any) => {
    const itemAno = item["ANO"];
    if (itemAno !== year) {
      return acc; // se o ano não for igual, ele ignora
    }

    let key = (item[nameKey] || "").trim().toUpperCase();
    const tipo = item["TIPO"];
    const passageiros = Number(item["PASSAGEIRO"]) || 0;

    if ((windowWidth >= 768 && windowWidth <= 1120) || windowWidth < 600) {
      key = abbreviateRegion(key);
    }

    if (!acc[key]) {
      acc[key] = { [nameKey]: key, embarque: 0, desembarque: 0 };
    }

    if (tipo === "Embarque") {
      acc[key].embarque += passageiros;
    } else if (tipo === "Desembarque") {
      acc[key].desembarque += passageiros;
    }

    return acc;
  }, {});

  const chartData = Object.values(processedData);

  const tickFontSize = windowWidth < 768 ? 8 : windowWidth <= 1120 ? 10 : 12;

  return (
    <div>
      <h3 className="text-center mb-4 font-semibold">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 15, left: 15, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={nameKey} tick={{ fontSize: tickFontSize }} />
            <YAxis tick={{ fontSize: tickFontSize }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="embarque" fill={colors[0]} name="Embarques" />
            <Bar dataKey="desembarque" fill={colors[1]} name="Desembarques" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmbarqueDesembarqueRegiao;
