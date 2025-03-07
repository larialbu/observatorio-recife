"use client";

import React from "react";
import TableGeneric from "@/components/@global/tables/TableGeneric";

const MunicipalityInfo = ({ data = [], year, color = "#000000" }: any) => {
  // Filtra os dados com base no ano
  const aggregatedData = data
    .filter((item: any) => item["ANO"] === `${year}`)
    .map((item: any) => ({
      Município: item["Município"] || "Desconhecido",
      UF: item["UF"] || "-",
      Nota: (parseFloat(item["Nota"].replace(",", ".")) || 0).toFixed(2),
      Colocação: item["Colocação"] || "-",
      Dimensão: item["Dimensão"] || "-",
    }));

  // Ordena os dados por colocação (ascendente)
  const sortedData = aggregatedData.sort(
    (a: any, b: any) => a.Colocação - b.Colocação
  );

  // Cabeçalho para a tabela
  const header = ["Município", "UF", "Nota", "Colocação", "Dimensão"];

  // Gera as linhas da tabela
  const getRows = (values: any) => {
    const rows: string[][] = [];

    values.map((obj: any) => {
      rows.push([
        obj.Município,
        obj.UF,
        obj.Nota,
        obj.Colocação.toString(),
        obj.Dimensão,
      ]);
    });

    return rows;
  };

  // Verifica se existem dados válidos
  if (!sortedData.length) {
    return <div>Nenhum dado encontrado</div>;
  }

  return (
    <div className="relative bg-white w-full h-full">
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
