import Card from '@/components/@global/cards/Card'
import { getObjToArr } from '@/utils/formatters/getObjToArr'

const IptuContribuintesComparacao = ({
  data,
  date,
  title = `Contribuintes IPTU Total Comparação Ano Anterior (ano)`,
  local = '',
  year,
  color,
}: any) => {
  const dataPast = data?.['past'] || []
  const dataCurrent = data?.['tributos'] || []
  
  const currentLength = getObjToArr<number>(dataCurrent['tipo de uso do imóvel'] || {}).reduce((acc, curr) => acc + curr['value'], 0) || 0
  const pastLength = getObjToArr<number>(dataPast['tipo de uso do imóvel'] || {}).reduce((acc, curr) => acc + curr['value'], 0) || 0

  const chartData = (((currentLength - pastLength) / pastLength) * 100).toFixed(2) || 0;

  return (
    <>
      {!!pastLength && <Card
        local={local}
        title={`${title.replace('ano', year)}`}
        percent
        data={chartData}
        year={year}
        color={color}
      />}
    </>
  )
}

export default IptuContribuintesComparacao
