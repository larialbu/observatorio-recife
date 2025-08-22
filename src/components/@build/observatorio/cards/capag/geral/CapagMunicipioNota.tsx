import Card from '@/components/@global/cards/Card'
import { monthLongName } from '@/utils/formatters/@global/monthLongName'

const CapagMunicipioNota = ({
  data,
  date,
  title = `Nota (municipio)`,
  local = '',
  year,
  color,
}: any) => {
  const municipioName = data[0]?.['Município'] || 'n.d'
    
  const chartData = data[0]['nota'] || 'n.d'

  return (
    <Card
      local={local}
      title={`${title.replace('municipio', municipioName)}`}
      data={chartData}
      year={year}
      color={color}
      text
    />
  )
}

export default CapagMunicipioNota
