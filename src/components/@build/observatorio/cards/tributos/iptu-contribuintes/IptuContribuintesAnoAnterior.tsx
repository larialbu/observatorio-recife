import Card from '@/components/@global/cards/Card'

const IptuContribuintesAnoAnterior = ({
  data,
  date,
  title = `Contribuintes Ano Anterior (ano)`,
  local = '',
  year,
  color,
}: any) => {
  const yearCorrect = (year - 1) || 0

  const dataPast = data?.['past'] || []
  
  const chartData = dataPast?.length || 0

  return (
    <>
      {!!chartData && <Card
        local={local}
        title={`${title.replace('ano', yearCorrect)}`}
        data={chartData}
        year={`${yearCorrect}`}
        color={color}
      />}
    </>
  )
}

export default IptuContribuintesAnoAnterior
