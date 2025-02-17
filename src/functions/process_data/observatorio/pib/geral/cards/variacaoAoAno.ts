/**
 * Função para calcular a variação percentual do PIB entre dois anos.
 * @param data2020 - Array de objetos contendo os dados brutos do PIB para 2020.
 * @param data2021 - Array de objetos contendo os dados brutos do PIB para 2021.
 * @returns Um objeto com a variação percentual formatada.
 */
export const calculatePibVariation = (data2020: any[], data2021: any[]) => {
    // Validação inicial: Verifica se os dados são arrays
    if (!Array.isArray(data2020) || !Array.isArray(data2021)) {
      throw new Error("Os dados fornecidos devem ser arrays.");
    }
  
    // Combina os dados dos dois anos
    const combinedData = [...data2020, ...data2021];
  
    // Filtra os dados para incluir apenas registros de Recife - PE nos anos 2020 e 2021
    const recifeData = combinedData.filter(
      (item) =>
        item["Município - UF"] === "Recife - PE" &&
        (item.Ano === 2020 || item.Ano === 2021)
    );
  
    // Validação: Verifica se há dados suficientes para calcular a variação
    if (recifeData.length < 2) {
      throw new Error("Não foram encontrados dados suficientes para calcular a variação.");
    }
  
    // Ordena os dados por ano (opcional, mas garante consistência)
    recifeData.sort((a, b) => a.Ano - b.Ano);
  
    // Extrai os valores do PIB para 2020 e 2021
    const pib2020 = parseFloat(
      (recifeData[0]["Produto Interno Bruto, \na preços correntes\n(R$ 1.000)"] || "0")
        .toString()
        .replace(/\./g, "") // Remove pontos de milhar
        .replace(",", ".")  // Substitui vírgula por ponto decimal
    ) * 1000; // Converte de milhares para reais
  
    const pib2021 = parseFloat(
      (recifeData[1]["Produto Interno Bruto, \na preços correntes\n(R$ 1.000)"] || "0")
        .toString()
        .replace(/\./g, "") // Remove pontos de milhar
        .replace(",", ".")  // Substitui vírgula por ponto decimal
    ) * 1000; // Converte de milhares para reais
  
    // Validação: Verifica se os valores do PIB são válidos
    if (isNaN(pib2020) || isNaN(pib2021)) {
      throw new Error("Os valores do PIB são inválidos ou não podem ser convertidos.");
    }
  
    // Calcula a variação percentual
    const variation = ((pib2021 - pib2020) / pib2020) * 100;
  
    return {
      yearStart: 2020,
      yearEnd: 2021,
      variation: variation.toFixed(2), // Retorna a variação com duas casas decimais
    };
  };