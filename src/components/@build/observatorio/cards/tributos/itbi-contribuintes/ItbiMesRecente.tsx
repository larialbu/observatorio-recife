import Card from '@/components/@global/cards/Card'
import { monthLongName } from '@/utils/formatters/@global/monthLongName'

const ItbiMesRecente = ({
  data,
  date,
  title = `Transmissões (mês)`,
  local = '',
  year,
  color,
}: any) => {
  const dataItbi = data?.['tributos']
  
  const monthsData = Object.keys(dataItbi?.['mes'] || {})

  const curMonthData = monthsData.sort(
    (a: any, b: any) => +b - +a,
  )?.[0]

  const curMonthName = monthLongName(+curMonthData)

  const chartData = dataItbi?.['mes']?.[curMonthData] || 0

  return (
    <Card
      local={local}
      title={`${title.replace('mês', curMonthName)}`}
      data={chartData}
      year={year}
      color={color}
    />
  )
}

export default ItbiMesRecente
