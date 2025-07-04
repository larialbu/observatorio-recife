import Card from '@/components/@global/cards/Card'
import { monthLongName } from '@/utils/formatters/@global/monthLongName'

const EmpresasAtivasNaturezaMesAnterior = ({
  data,
  date,
  title = `Empresas Ativas anteriormente (mês)`,
  local = '',
  year,
  color,
}: any) => {
  const dataEmpresas = data['empresas']

  const monthsData = Object.keys(dataEmpresas['mes'])

  const curMonthData = monthsData.sort(
    (a: any, b: any) => +b - +a,
  )?.[1]

  const curMonthName = monthLongName(+curMonthData)

  const chartData = dataEmpresas['mes'][curMonthData] || 0

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

export default EmpresasAtivasNaturezaMesAnterior
