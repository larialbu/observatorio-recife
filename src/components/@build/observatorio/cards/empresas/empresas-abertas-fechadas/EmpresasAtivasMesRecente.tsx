import Card from '@/components/@global/cards/Card'
import ComparativeCard from '@/components/@global/cards/ComparativeCard'
import { monthLongName } from '@/utils/formatters/@global/monthLongName'

const EmpresasAtivasClassesMesRecente = ({
  data,
  title = `Empresas Ativas Naturezas`,
  compare,
  toCompare,
  comparative = `${toCompare} x ${compare}`,
  year,
  color,
}: any) => {
  // const toCompareData = data[toCompare]['municipio']
  // const compareData = data[compare]['municipio']
  
  // const monthsDataToCompare = Object.keys(toCompareData['mes'])

  // const curMonthData = monthsDataToCompare.sort(
  //   (a: any, b: any) => +b - +a,
  // )?.[0]

  // const curMonthName = monthLongName(+curMonthData)

  // const chartData = compareData['mes'][curMonthData] || 0
  
  // const chartData2 = toCompareData['mes'][curMonthData] || 0

  console.log('COMPARE', compare)
  console.log('ToCOMPARE', toCompare)
  console.log('DATA CARD->', data)
  console.log('DATA CARD-EMPRESAS-COMPARE->', data['empresas']['ativas'][compare])
  console.log('DATA CARD-EMPRESAS-ToCOMPARE->', data['empresas']['ativas'][toCompare])

  return (
    <p>COMPARATIVO CARD!</p>
    // <ComparativeCard
    //   title={`${title} (${curMonthName})`}
    //   data={chartData}
    //   year={year}
    //   color={color}
    //   data2={chartData2}
    //   comparative={comparative}
    //   compare={[toCompare, compare]}
    // />
  )
}

export default EmpresasAtivasClassesMesRecente
