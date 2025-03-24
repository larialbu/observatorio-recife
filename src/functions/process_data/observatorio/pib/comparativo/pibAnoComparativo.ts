const parsePIB = (pib: any): number => {
    // Converte o PIB para número, caso seja nulo ou inválido, retorna 0
    const parsed = parseFloat(pib || "0");
    return isNaN(parsed) ? 0 : parsed;
  };
  
  export const processPIBPorAnoComparativo = (data: any[], toCompare: string[], capita: boolean = false) => {
    // Inicializa um objeto para armazenar o PIB por município e ano
    const processedData: { [key: string]: { [key: number]: number } } = {};
  
    // Percorre os dados e soma o PIB para cada município de interesse
    data.forEach((item) => {
      const municipio = item["Município - UF"];
      // Verifica se o município está na lista de municípios a serem comparados
      if (toCompare.includes(municipio)) {
        const pib = parsePIB(item[capita ? "Produto Interno Bruto per capita,  a preços correntes (R$ 1,00)" : "Produto Interno Bruto,  a preços correntes (R$ 1.000)"]);
        const ano = item["Ano"];
  
        // Se o município ainda não estiver no processedData, inicializa o objeto para o município
        if (!processedData[municipio]) {
          processedData[municipio] = {};
        }
  
        // Acumula o PIB para o município e ano
        if (processedData[municipio][ano]) {
          processedData[municipio][ano] += pib;
        } else {
          processedData[municipio][ano] = pib;
        }
      }
    });
  
    // Agora, precisamos retornar um array com o PIB por ano e município
    const result: any = [];
  
    // Para cada ano, cria um objeto com o PIB dos municípios
    const anos = Array.from(new Set(data.map(item => item["Ano"]))); // Pega todos os anos presentes nos dados
    anos.sort((a, b) => a - b); // Ordena os anos em ordem crescente
  
    anos.forEach((ano) => {
      const anoData: { ano: number, [municipio: string]: number } = { ano };
      
      Object.keys(processedData).forEach((municipio) => {
        const pibAno = processedData[municipio][ano] || 0; // Se não houver PIB para o ano, coloca 0
        anoData[municipio] = pibAno;
      });
  
      result.push(anoData);
    });
  
    return result;
  };
  