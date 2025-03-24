const parsePIB = (pib: any): number => {
    // Converte o PIB para número, caso seja nulo ou inválido, retorna 0
    const parsed = parseFloat(pib || "0");
    return isNaN(parsed) ? 0 : parsed;
  };
  
  export const processPIBPorAno = (data: any[], capita: boolean = false) => {
    // Inicializa um objeto para armazenar o PIB por ano
    const processedData: { [key: number]: number } = {};
  
    // Percorre os dados e soma o PIB para cada ano
    data.forEach((item) => {
      const pib = parsePIB(item[capita ? "Produto Interno Bruto per capita,  a preços correntes (R$ 1,00)" : "Produto Interno Bruto,  a preços correntes (R$ 1.000)"]);
      const ano = item["Ano"];
  
      if (processedData[ano]) {
        processedData[ano] += pib; // Soma o PIB ao valor já acumulado para o ano
      } else {
        processedData[ano] = pib; // Se não tiver valor para o ano, inicializa com o PIB
      }
    });
  
    // Retorna um array com o ano e a soma do PIB
    return Object.entries(processedData).map(([ano, valor]) => ({
      ano: `${parseInt(ano, 10)}`,
      valor:  valor ,
    }));
  };
  