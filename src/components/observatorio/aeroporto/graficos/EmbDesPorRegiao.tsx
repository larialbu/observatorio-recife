import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EmbarqueDesembarqueRegiao = ({ data = [], nameKey, colors = ["#EC6625", "#0155AE"], title, year }: any) => {
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
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener('resize', handleResize);
      }
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

  const processedData = data.reduce((acc: any, item: any) => {
    if (item["ANO"] !== year) return acc; // Filtra pelo ano

    let key = (item[nameKey] || "").trim().toUpperCase();
    const tipo = item["TIPO"];
    const passageiros = Number(item["PASSAGEIRO"]) || 0;

    // Abreviação condicional com base na largura da tela
    if ((windowWidth >= 768 && windowWidth <= 1120) || windowWidth < 600) {
      key = abbreviateRegion(key);
    }

    if (!acc[key]) {
      acc[key] = { [nameKey]: key, embarque: 0, desembarque: 0 };
    }

    // Soma os valores de acordo com o tipo (Embarque ou Desembarque)
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
