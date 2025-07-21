import Card from '@/components/@global/cards/Card'
import ComparativeCard from '@/components/@global/cards/ComparativeCard'
import { monthLongName } from '@/utils/formatters/@global/monthLongName'

const EmpresasTempoAberturaMedio = ({
  data,
  title = `Tempo Médio Abertura de Empresas`,
  compare,
  toCompare,
  comparative = `${toCompare} x ${compare}`,
  year,
  color,
}: any) => {
    const dataEmpresas = data['empresas']

    const dataKeys = Object.keys(dataEmpresas)
    
    const dataFlat = dataKeys.map((dataMap) => dataEmpresas[dataMap]).flat()
    
    const curMonthData = Array.from(new Set(dataFlat.map((data) => data['mes']))).sort((a: number, b: number) => b - a)[0]

    const dataFiltred = dataFlat.filter((data: any) => data['mes'] === curMonthData)

    const curMonthName = monthLongName(+curMonthData)

    const chartData = dataFiltred.find(data => data['Municipio'] === compare)?.['Tempo_Medio_Abertura'] || 0
    
    const chartData2 = dataFiltred.find(data => data['Municipio'] === toCompare)?.['Tempo_Medio_Abertura'] || 0

  return (
    <ComparativeCard
      title={`${title} (${curMonthName})`}
      data={chartData}
      year={year}
      color={color}
      data2={chartData2}
      comparative={comparative}
      compare={[toCompare, compare]}
    />
  )
}

export default EmpresasTempoAberturaMedio
