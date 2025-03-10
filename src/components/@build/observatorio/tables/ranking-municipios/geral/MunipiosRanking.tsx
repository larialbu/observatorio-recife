"use client";

import React from "react";
import TableGeneric from "@/components/@global/tables/TableGeneric";

const MunicipalityInfo = ({
  data = [],
  year,
  color = "#000000",
}: any) => {
  // Filtra os dados com base no ano
  const aggregatedData = data
    .filter((item: any) => item["Ano"].toString() === `${year}`)
    .map((item: any) => ({
      Ano: item["Ano"],
      Município: item["Município"] || "Desconhecido",
      UF: item["UF"] || "-",
      Nota: (parseFloat(item["Nota"]) || 0).toFixed(2),
      Colocação: item["Colocação"] || "-",
    }));

  // Ordena os dados por colocação (ascendente)
  const sortedData = aggregatedData.sort((a: any, b: any) => a.Colocação - b.Colocação);

  // Cabeçalho para a tabela
  const header = ["Ano", "Município", "UF", "Nota", "Colocação"];

  // Gera as linhas da tabela
  const getRows = (values: any) => {
    const rows: string[][] = [];

    values.map((obj: any) => {
      rows.push([
        obj.Ano,
        obj.Município,
        obj.UF,
        obj.Nota,
        obj.Colocação.toString(),
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

export default MunicipalityInfo;
