import Card from '@/components/@global/cards/Card'
import { monthLongName } from '@/utils/formatters/@global/monthLongName'

const EmpresasAtivasClassesMesRecente = ({
  // data,
  // date,
  // title = `Empresas Ativas Naturezas (mês)`,
  // local = '',
  // year,
  // color,
  data,
  title = `Admitidos`,
  compare,
  toCompare,
  comparative = `${toCompare} x ${compare}`,
  year,
  color,
}: any) => {
  console.log('DataCard', data)
  console.log('ToCOmpare', toCompare)
  console.log('Compare', compare)
  const toCompareData = data[toCompare]['municipio']
  const compareData = data[compare]['municipio']

  console.log('datas', toCompareData, compareData)
  // const dataEmpresas = data['empresas']
  
  const monthsDataToCompare = Object.keys(toCompareData['mes'])

  const curMonthDataToCompare = monthsDataToCompare.sort(
    (a: any, b: any) => +b - +a,
  )?.[0]

  // const curMonthName = monthLongName(+curMonthData)

  // const chartData = dataEmpresas['mes'][curMonthData] || 0

  return (
    <p>Card1</p>
    // <ComparativeCard
    //   title={`${title} (${dataMonthKey})`}
    //   data={chartData}
    //   year={year}
    //   color={color}
    //   data2={chartData2}
    //   comparative={comparative}
    //   compare={[toCompare, compare]}
    // />

    // <Card
    //   local={local}
    //   title={`${title.replace('mês', curMonthName)}`}
    //   data={chartData}
    //   year={year}
    //   color={color}
    // />
  )
}

export default EmpresasAtivasClassesMesRecente
