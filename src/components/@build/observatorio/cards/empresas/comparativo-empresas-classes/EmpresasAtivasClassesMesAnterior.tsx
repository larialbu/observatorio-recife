import Card from '@/components/@global/cards/Card'
import ComparativeCard from '@/components/@global/cards/ComparativeCard'
import { monthLongName } from '@/utils/formatters/@global/monthLongName'

const EmpresasAtivasClassesMesAnterior = ({
  data,
  title = `Empresas Ativas anteriormente`,
  compare,
  toCompare,
  comparative = `${toCompare} x ${compare}`,
  year,
  color,
}: any) => {
  const toCompareData = data[toCompare]['municipio']
  const compareData = data[compare]['municipio']
  
  const monthsDataToCompare = Object.keys(toCompareData['mes'])

  const pastMonthData = monthsDataToCompare.sort(
    (a: any, b: any) => +b - +a,
  )?.[1]

  const pastMonthName = monthLongName(+pastMonthData)

  const chartData = compareData['mes'][pastMonthData] || 0
  
  const chartData2 = toCompareData['mes'][pastMonthData] || 0

  return (
    <>
      {pastMonthData &&
        <ComparativeCard
          title={`${title} (${pastMonthName})`}
          data={chartData}
          year={year}
          color={color}
          data2={chartData2}
          comparative={comparative}
          compare={[toCompare, compare]}
        />
      }
    </>
    
  )
}

export default EmpresasAtivasClassesMesAnterior
