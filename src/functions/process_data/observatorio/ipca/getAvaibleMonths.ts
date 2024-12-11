import { BruteDataIPCA } from '@/@types/observatorio/ipca/bruteDataIPCA'

export function getAvaibleMonths(
  jsonData: BruteDataIPCA[],
  anoFiltro: string,
): string[] {
  // Filtra os dados para o ano informado e extrai apenas o mês
  const mesesDisponiveis = jsonData
    .filter((item) => item.Mês.includes(anoFiltro))
    .map((item) => item.Mês.split(' ')[0]) // Extrai o mês do campo "Mês"
    .filter((mes, index, self) => self.indexOf(mes) === index) // Remove duplicatas

  return mesesDisponiveis
}
