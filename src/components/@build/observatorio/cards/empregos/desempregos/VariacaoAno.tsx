import Card from "@/components/@global/cards/Card";

const VariacaoAno = ({
  data,
  date,
  title = `Variação trimestre ano anterior`,
  local = '',
  year,
  color,
}: any) => {
 
  const dataMunicipio = data['trimestre']?.['municipiosTrimestre'] || []
  const dataMunicipioPast = data['trimestre']?.['municipiosTrimestrePast'] || []
  
  const dataQuarter = dataMunicipio.reduce((acc: number, obj: any) => {
    const data = +obj['Trimestre'].split('º')[0]
    acc = acc <= data ? data : acc

    return acc
  }, 0) 

  const quarter = dataQuarter  

  const dataPastFiltred = dataMunicipioPast.filter((obj: any) => +obj['Trimestre'].split('º')[0] == quarter)
  const dataCurFiltred = dataMunicipio.filter((obj: any) => +obj['Trimestre'].split('º')[0] == quarter)

  const taxaPastData = dataPastFiltred.reduce((acc: number, obj: any) => acc += obj['Taxa'] , 0) || 0
  const taxaCurData = dataCurFiltred.reduce((acc: number, obj: any) => acc += obj['Taxa'] , 0) || 0
  
  const chartData = taxaPastData > 0 ? (taxaCurData - taxaPastData).toFixed(2) : 0

  title += taxaPastData > 0 ? '' : ' - (Não possui dados)'

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

export default VariacaoAno;
