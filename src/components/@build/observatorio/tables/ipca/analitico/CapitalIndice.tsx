import TableGeneric from "@/components/@global/tables/TableGeneric";
import { rowsCapitalsIndice } from "@/functions/process_data/observatorio/ipca/analitico/tables/rowsCapitalsIndice";
import { percentFormatter } from "@/utils/formatters/@global/percentFormatter";
import { useState } from "react";

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
  const [ordenation, setOrdenation] = useState([{ index: 1, name: 'VARIAÇÃO_MENSAL', ordenation: 0 }, { index: 2, name: 'VARIAÇÃO_ACUMULADA', ordenation: 0 }, { index: 3, name: 'PESO_MENSAL', ordenation: 0 }]);

  const order = ordenation.find((item) => item.ordenation != 0)

  const aggregatedData = rowsCapitalsIndice(data, capital);

  const dataSorted = order ? aggregatedData.sort((a: any, b: any) => order.ordenation === 1 ? a[order.name] - b[order.name] : b[order.name] - a[order.name]) : aggregatedData

  const firstAggregated: any = aggregatedData[0];

  if (!firstAggregated) {
    return <div>Nenhum dado econtrado</div>;
  }

  const header = Object.keys(firstAggregated);

  const getRows = (values: any) => {
    const rows: string[][] = [];

    values.map((obj: any) => {
      rows.push([
        obj["GRUPO"],
        `${percentFormatter(+obj["VARIAÇÃO_MENSAL"])}%`,
        `${percentFormatter(+obj["VARIAÇÃO_ACUMULADA"])}%`,
        `${percentFormatter(+obj["PESO_MENSAL"])}%`,
      ]);
    });

    return rows;
  };

  return (
    <div className="relative w-full">
      <TableGeneric
        ordenations={ordenation}
        onOrdenationChange={setOrdenation}
        searchIndexes={[0]}
        enablePagination={false}
        withClick
        color={color}
        headers={header}
        title={title}
        // rows={getRows(aggregatedData)}
        rows={getRows(dataSorted)}
      />
    </div>
  );
};

export default CapitalIndice;
