import React from 'react';

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const RecifeDataTable = ({ data, year, color }: { data: any[]; year: string; color: string; }) => {
  // Agrupar e somar os dados de Recife por mês e ano
  const aggregatedData = data
    .filter((item) => item["AEROPORTO NOME"] === "RECIFE" && item["ANO"] === year)
    .reduce((acc, item) => {
      const mes = item["MÊS"];
      if (!acc[mes]) {
        acc[mes] = { ANO: year, MÊS: mes, PASSAGEIRO: 0, CARGA: 0, DECOLAGENS: 0 };
      }
      acc[mes].PASSAGEIRO += Number(item["PASSAGEIRO"]) || 0;
      acc[mes].CARGA += Number(item["CARGA"]) || 0;
      acc[mes].DECOLAGENS += Number(item["DECOLAGENS"]) || 0;
      return acc;
    }, {});

  const sortedData = Object.values(aggregatedData).sort((a: any, b: any) => parseInt(a.MÊS, 10) - parseInt(b.MÊS, 10));

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h3 className="text-center font-semibold text-xl p-4 text-white" style={{ backgroundColor: color }}>
        Dados de Recife ({year})
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 py-3 border-b border-gray-200 text-gray-600 font-semibold text-xs md:text-sm lg:px-5 text-center">Ano</th>
              <th className="px-2 py-3 border-b border-gray-200 text-gray-600 font-semibold text-xs md:text-sm lg:px-5 text-center">Mês</th>
              <th className="px-2 py-3 border-b border-gray-200 text-gray-600 font-semibold text-xs md:text-sm lg:px-5 text-center">Passageiros</th>
              <th className="px-2 py-3 border-b border-gray-200 text-gray-600 font-semibold text-xs md:text-sm lg:px-5 text-center">Carga</th>
              <th className="px-2 py-3 border-b border-gray-200 text-gray-600 font-semibold text-xs md:text-sm lg:px-5 text-center">Decolagens</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item: any, index: number) => (
              <tr key={index}>
                <td className="px-2 py-2 border-b border-gray-200 text-xs md:text-sm lg:px-5 text-center">{item.ANO}</td>
                <td className="px-2 py-2 border-b border-gray-200 text-xs md:text-sm lg:px-5 text-center">{item.MÊS}</td>
                <td className="px-2 py-2 border-b border-gray-200 text-xs md:text-sm lg:px-5 text-center">{formatNumber(item.PASSAGEIRO)}</td>
                <td className="px-2 py-2 border-b border-gray-200 text-xs md:text-sm lg:px-5 text-center">{formatNumber(item.CARGA)}</td>
                <td className="px-2 py-2 border-b border-gray-200 text-xs md:text-sm lg:px-5 text-center">{formatNumber(item.DECOLAGENS)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecifeDataTable;
