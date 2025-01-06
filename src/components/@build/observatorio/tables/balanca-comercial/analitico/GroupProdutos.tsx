import TableGeneric from "@/components/@global/tables/TableGeneric";
import { rowsSh4ByMunicipio } from "@/functions/process_data/observatorio/balanca-comercial/analitico/rowsSH4Municipio";
import { formatNumber } from "@/utils/formatters/@global/numberFormatter";
import { useState } from "react";

const GroupProdutos = ({
  data = [],
  municipio,
  year,
  color = '#000000',
  country,
  title = `${municipio} (${year}) ${country ? `- ${country}` : ''} - Grupo de produtos`,
}: any) => {
  const aggregatedData = rowsSh4ByMunicipio(data, municipio, year, '11', country ? country : '')

  const sortedData = Object.values(aggregatedData).sort((a: any, b: any) => parseInt(a.MÊS, 10) - parseInt(b.MÊS, 10));

  const firstAggregated: any = aggregatedData[0];
  
  if (!firstAggregated) {
    return <div>Nenhum dado econtrado</div>;
  }

  const header = Object.keys(firstAggregated);

  const getRows = (values: any) => {
    const rows: string[][] = [];
    
    values.map((obj: any) => {
        rows.push([obj['CODIGO_SH4'], obj['DESCRICAO_SH4']]);
      });

    return rows;
  };

  return (
    <div className="relative bg-white w-full p-4">
      <TableGeneric searchIndexes={[0, 1]} enablePagination={false} onClick={(e: any) => {
        console.log('onCLick', e)
        }} color={color} headers={['CÓDIGO', 'DESCRIÇÃO']} title={title} rows={getRows(sortedData)} />
    </div>
  );
};

export default GroupProdutos;
