"use client";

import TableGeneric from "@/components/@global/tables/TableGeneric";

const formatCurrency = (v: number) => v?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const TabelaEvolucao = ({ data, title = "Evolução do Valor Total da Arrecadação do IPTU", colors = [] }: any) => {
  const rows: any[] = data?.tabelaEvolucao ?? [];
  const color = colors[0] ?? "#0155AE";

  const headers = ["Ano", "Mês", "Valor Total", "Ano Anterior", "Variação"];
  const tableRows = rows.map((r) => [r.ano, r.mes, formatCurrency(r.valorTotal), formatCurrency(r.anoAnterior), `${r.variacao}%`]);

  return (
    <div className="chart-wrapper w-full">
      <TableGeneric headers={headers} rows={tableRows} title={title} color={color} enablePagination={false} maxHeight={350} />
    </div>
  );
};

export default TabelaEvolucao;
