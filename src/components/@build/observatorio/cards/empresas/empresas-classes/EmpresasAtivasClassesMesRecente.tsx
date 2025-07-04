import Card from '@/components/@global/cards/Card'
import { monthLongName } from '@/utils/formatters/@global/monthLongName'

const EmpresasAtivasClassesMesRecente = ({
  data,
  date,
  title = `Empresas Ativas Naturezas (mês)`,
  local = '',
  year,
  color,
}: any) => {
  const dataEmpresas = data['empresas']
  
  const monthsData = Object.keys(dataEmpresas['mes'])

  const curMonthData = monthsData.sort(
    (a: any, b: any) => +b - +a,
  )?.[0]

  const curMonthName = monthLongName(+curMonthData)

  const chartData = dataEmpresas['mes'][curMonthData] || 0

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

export default EmpresasAtivasClassesMesRecente
