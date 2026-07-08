"use client";

import TableGeneric from "@/components/@global/tables/TableGeneric";

const TabelaAnual = ({ data, title = "Total de Imóveis por Ano e Mês", colors = [] }: any) => {
  const rows: any[] = data?.tabelaAnual ?? [];
  const color = colors[0] ?? "#0155AE";

  const headers = ["Ano", "Mês", "Total de Imóveis", "Ano Anterior", "Variação"];
  const tableRows = rows.map((r) => [r.ano, r.mes, r.total, r.anoAnterior, `${r.variacao}%`]);

  return (
    <div className="chart-wrapper w-full">
      <TableGeneric headers={headers} rows={tableRows} title={title} color={color} enablePagination={false} maxHeight={350} />
    </div>
  );
};

export default TabelaAnual;
