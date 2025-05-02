import Card from "@/components/@global/cards/Card";

const TaxaTrimestreAnterior = ({
  data,
  date,
  title = `Taxa desemprego`,
  local = '',
  year,
  color,
}: any) => {
 
  const dataMunicipio = data['trimestre']?.['municipiosTrimestre'] || []
  
  const dataQuarter = dataMunicipio.reduce((acc: number, obj: any) => {
    const data = +obj['Trimestre'].split('º')[0]
    acc = acc <= data ? data : acc

    return acc
  }, 0) 

  const quarter = dataQuarter - 1 

  const dataFiltred = dataMunicipio.filter((obj: any) => +obj['Trimestre'].split('º')[0] == quarter)

  const chartData = dataFiltred.reduce((acc: number, obj: any) => acc += obj['Taxa'] , 0) || 0
  
  title =  title + ` - (${quarter > 0 ? dataFiltred?.[0]?.['Trimestre'] : 'Não possui dados'} )`

  return (
    <Card
      local={local}
      title={`${title}`}
      data={chartData}
      year={year}
      color={color}
    />
  );
};

export default TaxaTrimestreAnterior;
