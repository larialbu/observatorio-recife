import Card from '@/components/@global/cards/Card'

const EmpresasAtivasMesRecente = ({
  data,
  date,
  title = `Empresas Ativas`,
  local = '',
  year,
  color,
}: any) => {
  const allValues = Object.values(data?.['ativas']?.['mes'] || {}).reduce((acc: number, num: any) => acc + num, 0);

  const chartData = allValues || 0

  return (
    <Card
      local={local}
      title={`${title}`}
      data={chartData}
      year={year}
      color={color}
    />
  )
}

export default EmpresasAtivasMesRecente
