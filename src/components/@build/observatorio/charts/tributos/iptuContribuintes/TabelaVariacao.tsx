"use client";

import TableGeneric from "@/components/@global/tables/TableGeneric";

const TabelaVariacao = ({ data, title = "Variação da Quantidade de Contribuintes", colors = [] }: any) => {
  const rows: any[] = data?.tabelaVariacao ?? [];
  const color = colors[0] ?? "#0155AE";

  const headers = ["Ano", "Mês", "Atual", "Ano Anterior", "Variação"];
  const tableRows = rows.map((r) => [r.ano, r.mes, r.atual, r.anterior, `${r.variacao}%`]);

  return (
    <div className="chart-wrapper w-full">
      <TableGeneric headers={headers} rows={tableRows} title={title} color={color} enablePagination={false} maxHeight={350} />
    </div>
  );
};

export default TabelaVariacao;
