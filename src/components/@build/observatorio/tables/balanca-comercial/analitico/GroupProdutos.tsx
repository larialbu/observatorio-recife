import TableGeneric from "@/components/@global/tables/TableGeneric";
import { rowsSh4ByMunicipio } from "@/functions/process_data/observatorio/balanca-comercial/analitico/rowsSH4Municipio";
import { formatNumber } from "@/utils/formatters/@global/numberFormatter";

const GroupProdutos = ({
  data = [],
  municipio,
  year,
  color = '#000000',
  country,
  monthRecent,
  title = `${municipio} (${monthRecent ? `${monthRecent} - ` : ''}${year}) ${country ? `- ${country}` : ''} - Grupo de produtos`,
}: any) => {
  const aggregatedData = rowsSh4ByMunicipio(data, municipio, year, monthRecent, country ? country : '')

  const sortedData = Object.values(aggregatedData).sort((a: any, b: any) => parseInt(a.MÊS, 10) - parseInt(b.MÊS, 10));

  const firstAggregated: any = aggregatedData[0];
  
  if (!firstAggregated) {
    return <div>Nenhum dado econtrado</div>;
  }

  const header: any = Object.keys(firstAggregated);

  const getRows = (values: any) => {
    const rows: string[][] = [];
    
    console.log()
    
    const formatPercent = (val: number) => {
      let percent 
  
      if ((Math.round(val * 100) / 100) != 0 ) {
          percent = Math.round(val * 100) / 100
      } else if ((Math.round(val * 100) / 100) == 0 && (Math.round(val * 1000) / 1000) != 0) {
          percent = Math.round(val * 1000) / 1000
      } else if ((Math.round(val * 1000) / 1000) == 0 && (Math.round(val * 10000) / 10000) != 0) {
          percent = Math.round(val * 10000) / 10000
      } else if ((Math.round(val * 10000) / 10000) == 0 && (Math.round(val * 100000) / 100000) != 0) {
        percent = Math.round(val * 100000) / 100000
    } else if ((Math.round(val * 100000) / 100000) == 0 && (Math.round(val * 100000) / 100000) != 0) {
      percent = Math.round(val * 1000000) / 1000000
  }  
 
      return percent
    } 

    values.map((obj: any) => {
        rows.push([<div className="text-center flex items-center justify-center">{formatPercent(obj['PARTICIPAÇÃO'])}%</div>, obj['CÓDIGO SH4'], obj['DESCRIÇÃO SH4'], <div className="flex gap-1 justify-center"><span>$</span> {formatNumber(obj.NEGOCIADO)}</div>, <div className="flex gap-1 justify-center"><span>$</span> {formatNumber(obj['IMPORTAÇÃO'])}</div>, <div className="flex gap-1 justify-center"><span>$</span> {formatNumber(obj['EXPORTAÇÃO'])}</div>]);
      });

    return rows;
  };


  return (
    <div className="relative bg-white w-full p-4">
      <TableGeneric searchIndexes={[1, 2]} enablePagination={false} onClick={(e: any) => {
        console.log('onCLick', e)
        }} color={color} headers={header} title={title} rows={getRows(sortedData)} />
    </div>
  );
};

export default GroupProdutos;
