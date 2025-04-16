import TableGeneric from "@/components/@global/tables/TableGeneric";
import { processRowsSh4ByMunicipio } from "@/functions/process_data/observatorio/balanca-comercial/analitico/rowsSH4Municipio";
import { formatNumber } from "@/utils/formatters/@global/numberFormatter";
import { percentFormatter } from "@/utils/formatters/@global/percentFormatter";
import { FC, ReactNode } from "react";
import { BalancaHeaders } from "@/@types/observatorio/@fetch/balanca-comercial";

type AggregatedProductRow = {
  "CÓDIGO SH4": number;
  "DESCRIÇÃO SH4": string;
  "PARTICIPAÇÃO": number;
  "NEGOCIADO": number;
  "IMPORTAÇÃO": number;
  "EXPORTAÇÃO": number;
};

interface GroupProdutosProps {
  data: BalancaHeaders[];
  municipio: string;
  year: string;
  country?: string;
  color?: string;
  monthRecent?: number;
  title?: string;
}

const GroupProdutos: FC<GroupProdutosProps> = ({
  data = [],
  municipio,
  year,
  color = "#000000",
  country,
  monthRecent,
  title = `${municipio} (${monthRecent ? `${monthRecent} - ` : ""}${year}) ${
    country ? `- ${country}` : ""
  } - Grupo de produtos`,
}) => {

  const aggregatedData = processRowsSh4ByMunicipio(
    data,
    municipio,
    year,
    monthRecent,
    country || ""
  );


  const firstAggregated = aggregatedData[0];

  if (!firstAggregated) {
    return <div>Nenhum dado encontrado</div>;
  }

  const header = [
    "Participação",
    "Código SH4",
    "Descrição SH4",
    "Negociado",
    "Importação",
    "Exportação",
  ];

  const getRows = (values: AggregatedProductRow[]): ReactNode[][] => {
    return values.map((obj) => [
      <div className="text-center flex items-center justify-center">
        {percentFormatter(obj["PARTICIPAÇÃO"])}%
      </div>,
      obj["CÓDIGO SH4"],
      obj["DESCRIÇÃO SH4"],
      <div className="flex gap-1 justify-center">
        <span>$</span> {formatNumber(obj["NEGOCIADO"])}
      </div>,
      <div className="flex gap-1 justify-center">
        <span>$</span> {formatNumber(obj["IMPORTAÇÃO"])}
      </div>,
      <div className="flex gap-1 justify-center">
        <span>$</span> {formatNumber(obj["EXPORTAÇÃO"])}
      </div>,
    ]);
  };

  return (
    <div className="relative w-full">
      <TableGeneric
        searchIndexes={[1, 2]}
        enablePagination={false}
        onClick={() => {}}
        color={color}
        headers={header}
        title={title}
        rows={getRows(aggregatedData)}
      />
    </div>
  );
};

export default GroupProdutos;
