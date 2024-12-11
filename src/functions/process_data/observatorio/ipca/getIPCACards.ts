import { BruteDataIPCA } from "@/@types/observatorio/ipca/bruteDataIPCA";
import { CardsIPCA } from "@/@types/observatorio/ipca/cardsIPCA";

export function getIPCACards(
  jsonData: BruteDataIPCA[],
  mesFiltro: string,
  capitalFiltro: string
): CardsIPCA | null {
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
