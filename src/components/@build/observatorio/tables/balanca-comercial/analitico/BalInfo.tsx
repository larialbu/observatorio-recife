import TableGeneric from "@/components/@global/tables/TableGeneric";
import { processRowsPaisesByMunicipio } from "@/functions/process_data/observatorio/balanca-comercial/analitico/rowsCountrysByMunicipio";
import { formatNumber } from "@/utils/formatters/@global/numberFormatter";
import { percentFormatter } from "@/utils/formatters/@global/percentFormatter";
import { FC, ReactNode } from "react";
import { BalancaHeaders } from "@/@types/observatorio/@fetch/balanca-comercial";

type AggregatedRow = {
  PAÍS: string;
  PARTICIPAÇÃO: number;
  NEGOCIADO: number;
  IMPORTAÇÃO: number;
  EXPORTAÇÃO: number;
};

interface BalInfoProps {
  data: BalancaHeaders[];
  municipio: string;
  year: string;
  color?: string;
  selectCountry: (country: string) => void;
  monthRecent?: number;
  title?: string;
}

const BalInfo: FC<BalInfoProps> = ({
  data = [],
  municipio,
  year,
  color = "#000000",
  selectCountry,
  monthRecent,
  title = `${municipio} (${monthRecent ? `${monthRecent} - ` : ""}${year}) - Negociações`,
}) => {
  const aggregatedData = processRowsPaisesByMunicipio(
    data,
    municipio,
    year,
    monthRecent
  );

  const sortedData = Object.values(aggregatedData).sort(
    (a: AggregatedRow, b: AggregatedRow) => (b.NEGOCIADO - a.NEGOCIADO)
  );

  const firstAggregated = sortedData[0];

  if (!firstAggregated) {
    return <div>Nenhum dado encontrado</div>;
  }

  const header = ["País", "Participação", "Negociado", "Importação", "Exportação"];

  const getRows = (values: AggregatedRow[]): (string | ReactNode)[][] => {
    return values.map((obj) => [
      obj.PAÍS,
      `${percentFormatter(+obj.PARTICIPAÇÃO)}%`,
      <div className="flex gap-1 justify-center"><span>$</span> {formatNumber(obj.NEGOCIADO)}</div>,
      <div className="flex gap-1 justify-center"><span>$</span> {formatNumber(obj.IMPORTAÇÃO)}</div>,
      <div className="flex gap-1 justify-center"><span>$</span> {formatNumber(obj.EXPORTAÇÃO)}</div>,
    ]);
  };

  return (
    <div className="relative w-full">
      <TableGeneric
        searchIndexes={[0]}
        enablePagination={false}
        withClick
        onClick={(e: string[]) => {
          selectCountry(e[0]);
        }}
        color={color}
        headers={header}
        title={title}
        rows={getRows(sortedData)}
      />
    </div>
  );
};

export default BalInfo;
