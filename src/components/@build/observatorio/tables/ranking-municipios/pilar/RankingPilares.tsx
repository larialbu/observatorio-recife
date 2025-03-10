"use client";

import React from "react";
import TableGeneric from "@/components/@global/tables/TableGeneric";

const RankingPilares = ({
  data = [],
  year,
  color = "#000000",
}: any) => {
  // Filtra os dados com base no ano
  const aggregatedData = data
    .filter((item: any) => item["ANO"] === `2024`)
    .map((item: any) => ({
      ANO: item["ANO"],
      Município: item["Município"] || "Desconhecido",
      UF: item["UF"] || "-",
      Nota: (parseFloat(item["Nota"].replace(",", ".")) || 0).toFixed(2),
      Colocação: item["Colocação"] || "-",
      Pilar: item["Pilar"] || "-"
    }));

  // Ordena os dados por colocação (ascendente)
  const sortedData = aggregatedData.sort((a: any, b: any) => a.Colocação - b.Colocação);

  // Cabeçalho para a tabela
  const header = ["ANO", "Município", "UF", "Nota", "Colocação", "Pilar"];

  // Gera as linhas da tabela
  const getRows = (values: any) => {
    const rows: string[][] = [];

    values.map((obj: any) => {
      rows.push([
        obj.ANO,
        obj.Município,
        obj.UF,
        obj.Nota,
        obj.Colocação.toString(),
        obj.Pilar
      ]);
    });

    return rows;
  };

  // Verifica se existem dados válidos
  if (!sortedData.length) {
    return <div>Nenhum dado encontrado</div>;
  }

  return (
    <div className="relative w-full h-full">
      <TableGeneric
        maxHeight={900}
        rowsPerPage={100}
        color={color}
        headers={header}
        title={`Dados de Municípios (${year})`}
        rows={getRows(sortedData)}
      />
    </div>
  );
};

export default RankingPilares;
