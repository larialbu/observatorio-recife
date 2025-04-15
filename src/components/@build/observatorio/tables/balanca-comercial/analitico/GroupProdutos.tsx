import TableGeneric from "@/components/@global/tables/TableGeneric";
import { rowsSh4ByMunicipio } from "@/functions/process_data/observatorio/balanca-comercial/analitico/rowsSH4Municipio";
import { formatNumber } from "@/utils/formatters/@global/numberFormatter";
import { percentFormatter } from "@/utils/formatters/@global/percentFormatter";

const GroupProdutos = ({
  data = [],
  municipio,
  year,
  color = "#000000",
  country,
  monthRecent,
  title = `${municipio} (${monthRecent ? `${monthRecent} - ` : ""}${year}) ${
    country ? `- ${country}` : ""
  } - Grupo de produtos`,
}: any) => {
  const aggregatedData = rowsSh4ByMunicipio(
    data,
    municipio,
    year,
    monthRecent,
    country ? country : ""
  );

  const sortedData = Object.values(aggregatedData).sort(
    (a: any, b: any) => parseInt(a.MÊS, 10) - parseInt(b.MÊS, 10)
  );

  const firstAggregated: any = aggregatedData[0];

  if (!firstAggregated) {
    return <div>Nenhum dado econtrado</div>;
  }

  const header = ["Participação", "Código SH4", "Descrição SH4", "Negociado", "Importação", "Exportação"]; 

  const getRows = (values: any) => {
    const rows: string[][] = [];
    values.map((obj: any) => {
      rows.push([
        <div className="text-center flex items-center justify-center">
          {percentFormatter(obj["PARTICIPAÇÃO"])}%
        </div>,
        obj["CÓDIGO SH4"],
        obj["DESCRIÇÃO SH4"],
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
    <div className="relative w-full">
      <TableGeneric
        searchIndexes={[1, 2]}
        enablePagination={false}
        onClick={(e: any) => {
          
        }}
        color={color}
        headers={header}
        title={title}
        rows={getRows(sortedData)}
      />
    </div>
  );
};

export default GroupProdutos;
