import TableGeneric from "@/components/@global/tables/TableGeneric";
import { processRowsPaisesByMunicipio } from "@/functions/process_data/observatorio/balanca-comercial/analitico/rowsCountrysByMunicipio";
import { formatNumber } from "@/utils/formatters/@global/numberFormatter";
import { percentFormatter } from "@/utils/formatters/@global/percentFormatter";
import { FC, ReactNode, useState } from "react";
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
  const [ordenation, setOrdenation] = useState([{ index: 1, name: 'PARTICIPAÇÃO', ordenation: 0 }, { index: 2, name: 'NEGOCIADO', ordenation: 0 }, { index: 3, name: 'IMPORTAÇÃO', ordenation: 0 }, { index: 4, name: 'EXPORTAÇÃO', ordenation: 0 }]);

  const order = ordenation.find((item) => item.ordenation != 0)

  const aggregatedData = processRowsPaisesByMunicipio(
    data,
    municipio,
    year,
    monthRecent
  );

  const sortedData = Object.values(aggregatedData).sort(
    (a: AggregatedRow, b: AggregatedRow) => (b.NEGOCIADO - a.NEGOCIADO)
  );

  const dataSorted = order ? sortedData.sort((a: any, b: any) => order.ordenation === 1 ? a[order.name] - b[order.name] : b[order.name] - a[order.name]) : sortedData

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
        ordenations={ordenation}
        onOrdenationChange={setOrdenation}
        searchIndexes={[0]}
        enablePagination={false}
        withClick
        onClick={(e: string[]) => {
          selectCountry(e[0]);
        }}
        color={color}
        headers={header}
        title={title}
        rows={getRows(dataSorted)}
      />
    </div>
  );
};

export default BalInfo;
