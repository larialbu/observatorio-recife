"use client";

import TableGeneric from "@/components/@global/tables/TableGeneric";

const formatCurrency = (v: number) => v?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const TabelaTransacoes = ({ data, title = "Transações Imobiliárias", colors = [] }: any) => {
  const rows: any[] = data?.tabelaTransacoes ?? [];
  const color = colors[0] ?? "#0155AE";

  const headers = ["Data", "Logradouro", "Bairro", "Tipo do Imóvel", "Valor de Avaliação"];
  const tableRows = rows.map((r) => [r.data, r.logradouro, r.bairro, r.tipoImovel, formatCurrency(r.valorAvaliacao)]);

  return (
    <div className="chart-wrapper w-full">
      <TableGeneric headers={headers} rows={tableRows} title={title} color={color} rowsPerPage={10} searchIndexes={[1, 2]} maxHeight={400} />
    </div>
  );
};

export default TabelaTransacoes;
