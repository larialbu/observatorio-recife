import { BruteDataIPCA } from '@/@types/observatorio/ipca/bruteDataIPCA'

interface ChartData {
  month: string // Capital
  uv: 0
  pv: number // IPCA - Variação acumulada em 12 meses(%)
}

export function getFiveCapitals(
  jsonData: BruteDataIPCA[],
  mesFiltro: string,
): ChartData[] {
  // Filtra os dados para o mês informado
  const dadosFiltrados = jsonData.filter((item) => item.Mês === mesFiltro)

  // Mapeia os dados para o formato ChartData com o valor decimal no campo pv
  const chartData: ChartData[] = dadosFiltrados.map((item) => ({
    month: item.Capital,
    uv: 0,
    pv:
      parseFloat(
        item['IPCA - Variação acumulada em 12 meses(%)'].replace(',', '.'),
      ) || 0, // Formato decimal
  }))

  // Ordena pelo maior valor de IPCA acumulado em 12 meses e retorna os 5 maiores
  const top5Capitais = chartData.sort((a, b) => b.pv - a.pv).slice(0, 5)

  return top5Capitais
}
