import Card from '@/components/@global/cards/Card'

const IptuContribuintesComparacao = ({
  data,
  date,
  title = `Contribuintes Comparação Ano Anterior (ano)`,
  local = '',
  year,
  color,
}: any) => {
  const dataPast = data?.['past'] || []
  const dataCurrent = data?.['tributos'] || []
  
  const currentLength = dataCurrent?.length || 0;
  const pastLength = dataPast?.length || 0;

  const chartData = (((currentLength - pastLength) / pastLength) * 100).toFixed(2) || 0;

  return (
    <>
      {!!dataPast.length && <Card
        local={local}
        title={`${title.replace('ano', year)}`}
        percent
        data={chartData}
        year={year}
        color={color}
      />}
    </>
  )
}

export default IptuContribuintesComparacao
