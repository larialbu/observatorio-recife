import TableGeneric from "@/components/@global/tables/TableGeneric";
import { processRowsSh4ByMunicipio } from "@/functions/process_data/observatorio/balanca-comercial/analitico/rowsSH4Municipio";
import { formatNumber } from "@/utils/formatters/@global/numberFormatter";
import { percentFormatter } from "@/utils/formatters/@global/percentFormatter";
import { FC, ReactNode, useState } from "react";
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
  const [ordenation, setOrdenation] = useState([{ index: 0, name: 'PARTICIPAÇÃO', ordenation: 0 }, { index: 3, name: 'NEGOCIADO', ordenation: 0 }, { index: 4, name: 'IMPORTAÇÃO', ordenation: 0 }, { index: 5, name: 'EXPORTAÇÃO', ordenation: 0 }]);

  const order = ordenation.find((item) => item.ordenation != 0)

  const aggregatedData = processRowsSh4ByMunicipio(
    data,
    municipio,
    year,
    monthRecent,
    country || ""
  );

  const dataSorted = order ? aggregatedData.sort((a: any, b: any) => order.ordenation === 1 ? a[order.name] - b[order.name] : b[order.name] - a[order.name]) : aggregatedData

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
        ordenations={ordenation}
        onOrdenationChange={setOrdenation}
        searchIndexes={[1, 2]}
        enablePagination={false}
        onClick={() => {}}
        color={color}
        headers={header}
        title={title}
        rows={getRows(dataSorted)}
      />
    </div>
  );
};

export default GroupProdutos;
