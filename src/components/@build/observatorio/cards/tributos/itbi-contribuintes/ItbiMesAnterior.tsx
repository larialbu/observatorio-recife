import Card from '@/components/@global/cards/Card'
import { monthLongName } from '@/utils/formatters/@global/monthLongName'

const ItbiMesAnterior = ({
  data,
  date,
  title = `Transmissões anteriormente (mês)`,
  local = '',
  year,
  color,
}: any) => {
  const dataItbi = data?.['tributos']

  const monthsData = Object.keys(dataItbi?.['mes'] || {})

  const curMonthData = monthsData.sort(
    (a: any, b: any) => +b - +a,
  )?.[1]

  const curMonthName = monthLongName(+curMonthData)

  const chartData = dataItbi?.['mes']?.[curMonthData] || 0

  return (
    <>
      {curMonthData && <Card
        local={local}
        title={`${title.replace('mês', curMonthName)}`}
        data={chartData}
        year={year}
        color={color}
      />}
    </>
    
  )
}

export default ItbiMesAnterior
