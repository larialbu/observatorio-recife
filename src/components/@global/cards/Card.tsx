import React from "react";

const Card = ({
  title = "",
  data,
  year,
  color,
  local,
  percent = false, // Indica se o dado é uma porcentagem
  isPib = false, // Identifica se o card é específico para PIB
}: {
  title: string;
  local?: string;
  data: number | string;
  year: string;
  color: string;
  percent?: boolean;
  isPib?: boolean; // Identifica se o card é específico para PIB
}) => {
  // Função para formatar números como moeda brasileira
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Converte o dado para número, tratando vírgulas como separadores decimais
  const parseNumber = (value: string | number): number => {
    if (typeof value === "string") {
      return parseFloat(value.replace(/\./g, "").replace(",", "."));
    }
    return value;
  };

  // Determina o valor a ser exibido com base no tipo de dado
  const displayData = () => {
    if (isPib) {
      // Formata o PIB como moeda brasileira
      const numericValue = parseNumber(data);
      return formatCurrency(numericValue);
    } else if (percent) {
      // Adiciona o símbolo de porcentagem
      return `${data}%`;
    } else {
      // Retorna o número formatado normalmente
      return parseNumber(data).toLocaleString("pt-BR");
    }
  };

  return (
    <div
      className="rounded-lg p-4 flex-1 shrink-0 min-w-[310px] w-full border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out"
      style={{ borderLeft: `8px solid ${color}` }}
    >
      {/* Header: Local and Year */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-light text-gray-600">
          {local ? `${local} -` : ""} {year}
        </span>
      </div>
      {/* Main Data */}
      <h1 className="text-4xl font-bold text-gray-900 mb-2 w-fit">
        {displayData()}
      </h1>
      {/* Title */}
      <h2 className="text-lg font-medium text-gray-700 opacity-80">{title}</h2>
    </div>
  );
};

export default Card;