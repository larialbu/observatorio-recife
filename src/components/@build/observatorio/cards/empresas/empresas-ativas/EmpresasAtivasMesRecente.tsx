import Card from '@/components/@global/cards/Card'
import { monthLongName } from '@/utils/formatters/@global/monthLongName'

const EmpresasAtivasMesRecente = ({
  data,
  date,
  title = `Empresas Ativas (mês)`,
  local = '',
  year,
  color,
}: any) => {
  const monthsData = Object.keys(data['mes'])

  const curMonthData = monthsData.sort(
    (a: any, b: any) => +b - +a,
  )?.[0]

  const curMonthName = monthLongName(+curMonthData)

  const chartData = data['mes'][curMonthData] || 0

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

export default EmpresasAtivasMesRecente
