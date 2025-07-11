import Card from '@/components/@global/cards/Card'
import { monthLongName } from '@/utils/formatters/@global/monthLongName'

const EmpresasAtivasInativasMesRecente = ({
  data,
  date,
  title = `Empresas Variação Ativas e Inativas (mês)`,
  local = '',
  year,
  color,
}: any) => {
  const monthsData = Object.keys(data['ativas']['mes'])

  const curMonthData = monthsData.sort(
    (a: any, b: any) => +b - +a,
  )?.[0]

  const curMonthName = monthLongName(+curMonthData)

  const chartData = (((data['ativas']['mes'][curMonthData] - data['inativas']['mes'][curMonthData]) / data['inativas']['mes'][curMonthData]) * 100).toFixed(0)

  return (
    <Card
      local={local}
      title={`${title.replace('mês', curMonthName)}`}
      data={chartData}
      year={year}
      color={color}
      percent
    />
  )
}

export default EmpresasAtivasInativasMesRecente
