import TableGeneric from "@/components/@global/tables/TableGeneric";
import { rowsCountrysByMunicipio } from "@/functions/process_data/observatorio/balanca-comercial/analitico/rowsCountrysByMunicipio";
import { formatNumber } from "@/utils/formatters/@global/numberFormatter";

const BalInfo = ({
  data = [],
  municipio,
  year,
  color = '#000000',
  selectCountry,
  monthRecent,
  title = `${municipio} (${monthRecent ? `${monthRecent} - ` : ''}${year}) - Negociações`,

}: any) => {
  console.log('-->>', `${monthRecent}`)
  const aggregatedData = rowsCountrysByMunicipio(data, municipio, year, monthRecent)

  const sortedData = Object.values(aggregatedData).sort((a: any, b: any) => parseInt(a.MÊS, 10) - parseInt(b.MÊS, 10));

  const firstAggregated: any = aggregatedData[0];
  
  if (!firstAggregated) {
    return <div>Nenhum dado econtrado</div>;
  }

  const header = Object.keys(firstAggregated);

  const getRows = (values: any) => {
    const rows: string[][] = [];
    
    values.map((obj: any) => {
        let percent 
    
        if ((Math.round(+obj['PARTICIPAÇÃO'] * 100) / 100) != 0 ) {
            percent = Math.round(+obj['PARTICIPAÇÃO'] * 100) / 100
        } else if ((Math.round(+obj['PARTICIPAÇÃO'] * 100) / 100) == 0 && (Math.round(+obj['PARTICIPAÇÃO'] * 1000) / 1000) != 0) {
            percent = Math.round(+obj['PARTICIPAÇÃO'] * 1000) / 1000
        } else if ((Math.round(+obj['PARTICIPAÇÃO'] * 1000) / 1000) == 0 && (Math.round(+obj['PARTICIPAÇÃO'] * 10000) / 10000) != 0) {
            percent = Math.round(+obj['PARTICIPAÇÃO'] * 10000) / 10000
        } 
    

        rows.push([obj['PAÍS'], `${percent}%`, <div className="flex gap-1 justify-center"><span>$</span> {formatNumber(obj.NEGOCIADO)}</div>]);
      });

    return rows;
  };

  return (
    <div className="relative bg-white w-full p-4">
      <TableGeneric searchIndexes={[0]} enablePagination={false}  withClick onClick={(e: any) => {
        // console.log('onCLick', e)
        selectCountry(e[0])
        }} color={color} headers={header} title={title} rows={getRows(sortedData)} />
    </div>
  );
};

export default BalInfo;
