import Card from '@/components/@global/cards/Card'
import { monthLongName } from '@/utils/formatters/@global/monthLongName'

const IptuContribuintes = ({
  data,
  date,
  title = `Contribuintes (ano)`,
  local = '',
  year,
  color,
}: any) => {
  const dataPast = data?.['tributos'] || []
  
  const chartData = dataPast?.length || 0

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
