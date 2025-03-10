import TableGeneric from "@/components/@global/tables/TableGeneric";
import { rowsCountrysByMunicipio } from "@/functions/process_data/observatorio/balanca-comercial/analitico/rowsCountrysByMunicipio";
import { rowsCapitalsIndice } from "@/functions/process_data/observatorio/ipca/analitico/tables/rowsCapitalsIndice";
import { formatNumber } from "@/utils/formatters/@global/numberFormatter";

const CapitalIndice = ({
  data = [],
  capital,
  year,
  color = "#000000",
  monthRecent,
  title = `${capital} (${
    monthRecent ? `${monthRecent} - ` : ""
  }${year}) - Índices`,
}: any) => {
  const aggregatedData = rowsCapitalsIndice(data, year, capital, monthRecent);

  console.log('AAGRRE', aggregatedData)

  const sortedData = Object.values(aggregatedData).sort(
    (a: any, b: any) => parseInt(a.MÊS, 10) - parseInt(b.MÊS, 10)
  );

  const firstAggregated: any = aggregatedData[0];

  if (!firstAggregated) {
    return <div>Nenhum dado econtrado</div>;
  }

  const header = Object.keys(firstAggregated);

  const getRows = (values: any) => {
    const rows: string[][] = [];

    values.map((obj: any) => {
      const formatPercent = (val: number) => {
        let percent;

        if (Math.round(val * 100) / 100 != 0) {
          percent = Math.round(val * 100) / 100;
        } else if (
          Math.round(val * 100) / 100 == 0 &&
          Math.round(val * 1000) / 1000 != 0
        ) {
          percent = Math.round(val * 1000) / 1000;
        } else if (
          Math.round(val * 1000) / 1000 == 0 &&
          Math.round(val * 10000) / 10000 != 0
        ) {
          percent = Math.round(val * 10000) / 10000;
        } else if (val === 0) {
          percent = 0;
        }

        return percent;
      };

      rows.push([
        obj["GRUPO"],
        `${formatPercent(+obj["VARIAÇÃO_MENSAL"])}%`,
        `${formatPercent(+obj["VARIAÇÃO_ACUMULADA"])}%`,
        `${formatPercent(+obj["PESO_MENSAL"])}%`,
      ]);
    });

    return rows;
  };

  return (
    <div className="relative w-full">
      <TableGeneric
        searchIndexes={[0]}
        enablePagination={false}
        withClick
        color={color}
        headers={header}
        title={title}
        rows={getRows(aggregatedData)}
      />
    </div>
  );
};

export default CapitalIndice;
