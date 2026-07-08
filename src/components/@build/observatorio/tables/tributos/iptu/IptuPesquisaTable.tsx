"use client";

import TableGeneric from "@/components/@global/tables/TableGeneric";

const formatCurrency = (v: number) => v?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const IptuPesquisaTable = ({ data, color = "#0155AE" }: any) => {
  const rows: any[] = data?.registros ?? [];

  const headers = ["Ano", "Logradouro", "Bairro", "IPTU", "m² de Construção", "m² do Terreno", "Valor Estimado do Imóvel"];
  const tableRows = rows.map((r) => [
    r.ano,
    r.logradouro,
    r.bairro,
    formatCurrency(r.iptu),
    r.m2Construcao,
    r.m2Terreno,
    formatCurrency(r.valorEstimado),
  ]);

  return (
    <div className="w-full">
      <TableGeneric
        headers={headers}
        rows={tableRows}
        title="IPTU - Pesquisa"
        color={color}
        rowsPerPage={15}
        searchIndexes={[1]}
        maxHeight={520}
      />
    </div>
  );
};

export default IptuPesquisaTable;
