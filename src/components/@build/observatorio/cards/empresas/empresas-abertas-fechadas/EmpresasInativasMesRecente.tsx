import Card from '@/components/@global/cards/Card'
import ComparativeCard from '@/components/@global/cards/ComparativeCard'
import { monthLongName } from '@/utils/formatters/@global/monthLongName'

const EmpresasInativasMesRecente = ({
  data,
  title = `Empresas Fechadas`,
  compare,
  toCompare,
  comparative = `${toCompare} x ${compare}`,
  year,
  color,
}: any) => {
  const toCompareData = data?.['empresas']?.['inativas']?.[toCompare] || {}
  const compareData = data?.['empresas']?.['inativas']?.[compare] || {}
  
  const monthsDataToCompare = Object.keys(toCompareData?.['mes'])

  const curMonthData = monthsDataToCompare.sort(
    (a: any, b: any) => +b - +a,
  )?.[0]

  const curMonthName = monthLongName(+curMonthData)

  const chartData = compareData?.['mes']?.[curMonthData] || 0
  
  const chartData2 = toCompareData?.['mes']?.[curMonthData] || 0

  return (
    <ComparativeCard
      title={`${title} (${curMonthName})`}
      data={chartData}
      year={year}
      color={color}
      data2={chartData2}
      comparative={comparative}
      compare={[toCompare, compare]}
    />
  )
}

export default EmpresasInativasMesRecente
