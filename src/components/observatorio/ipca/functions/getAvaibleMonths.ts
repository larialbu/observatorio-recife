export interface IPCAData {
  Capital: string;
  Mês: string; // Exemplo: "janeiro 2023"
  "IPCA - Variação mensal(%)": string;
  "IPCA - Variação acumulado no ano(%)": string;
  "IPCA - Variação acumulada em 12 meses(%)": string;
}

export function getAvaibleMonths(
  jsonData: IPCAData[],
  anoFiltro: string
): string[] {
  // Filtra os dados para o ano informado e extrai apenas o mês
  const mesesDisponiveis = jsonData
    .filter((item) => item.Mês.includes(anoFiltro))
    .map((item) => item.Mês.split(" ")[0]) // Extrai o mês do campo "Mês"
    .filter((mes, index, self) => self.indexOf(mes) === index); // Remove duplicatas

  return mesesDisponiveis;
}
