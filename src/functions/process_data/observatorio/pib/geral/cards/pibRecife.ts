/**
 * Função para buscar o PIB de Recife no ano mais recente.
 * @param data - Array de objetos contendo os dados brutos do PIB.
 * @returns Um objeto com o ano mais recente e o valor do PIB de Recife nesse ano.
 */
export const getLatestPibRecife = (data: any[]) => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("Os dados fornecidos estão vazios ou não são um array.");
  }

  // Filtra os dados para incluir apenas registros de Recife - PE
  const recifeData = data.filter(
    (item) => item["Município - UF"] === "Recife - PE"
  );

  if (recifeData.length === 0) {
    throw new Error("Não foram encontrados dados para Recife - PE.");
  }

  // Encontra o ano mais recente
  const latestYearData = recifeData.reduce((latest, current) => {
    return current.Ano > latest.Ano ? current : latest;
  });

  // Extrai o PIB do ano mais recente
  const pibValue = parseFloat(
    (latestYearData["Produto Interno Bruto, \na preços correntes\n(R$ 1.000)"] || "0")
      .toString()
      .replace(/\./g, "") // Remove pontos de milhar
      .replace(",", ".")  // Substitui vírgula por ponto decimal
  );

  // Converte o valor de milhares para reais
  const pibInReais = pibValue / 100;

  return {
    ano: latestYearData.Ano,
    pib: pibInReais, // Retorna o valor em reais
  };
};