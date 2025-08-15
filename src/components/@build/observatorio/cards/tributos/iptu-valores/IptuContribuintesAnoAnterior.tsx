import Card from '@/components/@global/cards/Card'
import { getObjToArr } from '@/utils/formatters/getObjToArr'

const IptuContribuintesAnoAnterior = ({
  data,
  date,
  title = `Contribuintes IPTU Total Ano Anterior (ano)`,
  local = '',
  year,
  color,
}: any) => {
  const yearCorrect = (year - 1) || 0

  const dataPast = data?.['past'] || []
  
  const chartData = getObjToArr<number>(dataPast['tipo de uso do imóvel'] || {}).reduce((acc, curr) => acc + curr['value'], 0) || 0

  return (
    <>
      {!!chartData && <Card
        local={local}
        title={`${title.replace('ano', yearCorrect)}`}
        data={chartData}
        year={`${yearCorrect}`}
        color={color}
      />}
    </>
  )
}

export default IptuContribuintesAnoAnterior
