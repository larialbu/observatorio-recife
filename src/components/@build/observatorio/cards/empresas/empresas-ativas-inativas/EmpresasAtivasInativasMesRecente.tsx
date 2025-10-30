import Card from '@/components/@global/cards/Card'

const EmpresasAtivasInativasMesRecente = ({
  data,
  date,
  title = `Empresas Saldo Ativas`,
  local = '',
  year,
  color,
}: any) => {
  const allValuesInativa = Object.values(data?.['inativas']?.['mes'] || {}).reduce((acc: number, num: any) => acc + num, 0) || 0;
  const allValuesAtiva = Object.values(data?.['ativas']?.['mes'] || {}).reduce((acc: number, num: any) => acc + num, 0) || 0;

  const chartData = allValuesAtiva - allValuesInativa || 0

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

export default EmpresasAtivasInativasMesRecente
