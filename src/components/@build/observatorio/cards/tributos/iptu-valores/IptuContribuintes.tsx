import Card from '@/components/@global/cards/Card'
import { monthLongName } from '@/utils/formatters/@global/monthLongName'
import { getObjToArr } from '@/utils/formatters/getObjToArr'

const IptuContribuintes = ({
  data,
  date,
  title = `Contribuintes IPTU Total (ano)`,
  local = '',
  year,
  color,
}: any) => {
  const dataTributos = data?.['tributos'] || []
  
  const chartData = getObjToArr<number>(dataTributos['tipo de uso do imóvel'] || {}).reduce((acc, curr) => acc + curr['value'], 0) || 0

  return (
    <>
      <Card
        local={local}
        title={`${title.replace('ano', year)}`}
        data={chartData}
        year={year}
        color={color}
      /> 
    </>
  )
}

export default IptuContribuintes
