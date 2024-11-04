export interface IPCAData {
  Capital: string;
  Mês: string;
  "IPCA - Variação mensal(%)": string;
  "IPCA - Variação acumulado no ano(%)": string;
  "IPCA - Variação acumulada em 12 meses(%)": string;
}

interface ResultadoIPCA {
  capital: string;
  mes: string;
  variacaoMensal: string;
  acumuladoAno: string;
  acumulado12Meses: string;
}

export function getIPCACards(
  jsonData: IPCAData[],
  mesFiltro: string,
  capitalFiltro: string
): ResultadoIPCA | null {
  // Filtra os dados pelo mês e pela capital escolhidos
  const dadosFiltrados = jsonData.find(
    (item) =>
      item.Mês.toLowerCase() === mesFiltro.toLowerCase() &&
      item.Capital.toLowerCase() === capitalFiltro.toLowerCase()
  );

  // Retorna os dados filtrados ou null se não encontrado
  return dadosFiltrados
    ? {
        capital: dadosFiltrados.Capital,
        mes: dadosFiltrados.Mês,
        variacaoMensal: dadosFiltrados["IPCA - Variação mensal(%)"],
        acumuladoAno: dadosFiltrados["IPCA - Variação acumulado no ano(%)"],
        acumulado12Meses:
          dadosFiltrados["IPCA - Variação acumulada em 12 meses(%)"],
      }
    : null;
}
