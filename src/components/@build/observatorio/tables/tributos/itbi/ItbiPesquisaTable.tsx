"use client";

import TableGeneric from "@/components/@global/tables/TableGeneric";

const formatCurrency = (v: number) => v?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const ItbiPesquisaTable = ({ data, color = "#0155AE" }: any) => {
  const rows: any[] = data?.registros ?? [];

  const headers = ["Data da Transação", "Bairro", "Tipo do Imóvel", "Valor de Avaliação"];
  const tableRows = rows.map((r) => [r.data, r.bairro, r.tipoImovel, formatCurrency(r.valorAvaliacao)]);

  return (
    <div className="w-full">
      <TableGeneric
        headers={headers}
        rows={tableRows}
        title="ITBI - Pesquisa"
        color={color}
        rowsPerPage={15}
        searchIndexes={[1]}
        maxHeight={520}
      />
    </div>
  );
};

export default ItbiPesquisaTable;
