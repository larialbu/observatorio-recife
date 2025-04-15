import TableGeneric from "@/components/@global/tables/TableGeneric";
import { rowsCountrysByMunicipio } from "@/functions/process_data/observatorio/balanca-comercial/analitico/rowsCountrysByMunicipio";
import { formatNumber } from "@/utils/formatters/@global/numberFormatter";
import { percentFormatter } from "@/utils/formatters/@global/percentFormatter";

const BalInfo = ({
  data = [],
  municipio,
  year,
  color = "#000000",
  selectCountry,
  monthRecent,
  title = `${municipio} (${
    monthRecent ? `${monthRecent} - ` : ""
  }${year}) - Negociações`,
}: any) => {

  const aggregatedData = rowsCountrysByMunicipio(
    data,
    municipio,
    year,
    monthRecent
  );

  const sortedData = Object.values(aggregatedData).sort(
    (a: any, b: any) => parseInt(a.MÊS, 10) - parseInt(b.MÊS, 10)
  );

  const firstAggregated: any = aggregatedData[0];

  if (!firstAggregated) {
    return <div>Nenhum dado econtrado</div>;
  }

  const header = ["País", "Participação", "Negociado", "Importação", "Exportação"]; 

  const getRows = (values: any) => {
    const rows: string[][] = [];

    values.map((obj: any) => {
      rows.push([
        obj["PAÍS"],
        `${percentFormatter(+obj["PARTICIPAÇÃO"])}%`,
        <div className="flex gap-1 justify-center">
          <span>$</span> {formatNumber(obj.NEGOCIADO)}
        </div>,
        <div className="flex gap-1 justify-center">
          <span>$</span> {formatNumber(obj["IMPORTAÇÃO"])}
        </div>,
        <div className="flex gap-1 justify-center">
          <span>$</span> {formatNumber(obj["EXPORTAÇÃO"])}
        </div>,
      ]);
    });

    return rows;
  };

  return (
    <div className="relative w-full ">
      <TableGeneric
        searchIndexes={[0]}
        enablePagination={false}
        withClick
        onClick={(e: any) => {
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
