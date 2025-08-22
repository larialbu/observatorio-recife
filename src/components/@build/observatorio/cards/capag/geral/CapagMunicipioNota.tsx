import Card from '@/components/@global/cards/Card'
import { monthLongName } from '@/utils/formatters/@global/monthLongName'

// "Cod.IBGE": 2611606
// Endividamento: 0.3499133884906769
// Endividamento_Nota: "A"
// Liquidez: 0.034141905605793
// Liquidez_Nota: "B"
// "Município": "Recife - PE"
// "Poupança Corrente": 0.9070610404014587
// "Poupança Corrente_Nota": "B"
// UF: "PE"
// ano: 2024

const CapagMunicipioNota = ({
  data,
  date,
  title = `Nota (municipio)`,
  local = '',
  year,
  color,
}: any) => {
  const municipioName = data[0]?.['Município'] || 'n.d'
    
  const chartData = data[0]['Endividamento_Nota'] || 'n.d'

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
