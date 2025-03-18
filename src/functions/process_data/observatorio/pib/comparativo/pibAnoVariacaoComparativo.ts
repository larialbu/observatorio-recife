const parsePIB = (pib: any): number => {
    // Converte o PIB para número, caso seja nulo ou inválido, retorna 0
    const parsed = parseFloat(pib || "0");
    return isNaN(parsed) ? 0 : parsed;
  };
  
  export const processPIBvariacaoComparativo = (data: any[], toCompare: string[]) => {
    // Inicializa um objeto para armazenar o PIB por município e ano
    const processedData: { [key: string]: { [key: number]: number } } = {};
  
    // Percorre os dados e soma o PIB para cada município de interesse
    data.forEach((item) => {
      const municipio = item["Município - UF"];
      // Verifica se o município está na lista de municípios a serem comparados
      if (toCompare.includes(municipio)) {
        const pib = parsePIB(item["Produto Interno Bruto,  a preços correntes (R$ 1.000)"]);
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
  
    // Agora, precisamos calcular a variação do PIB para cada município e ano
    const result: any[] = [];
  
    // Para cada ano presente nos dados, criamos um objeto com a variação para cada município
    const anos = Array.from(new Set(data.map(item => item["Ano"]))).sort((a, b) => a - b); // Pega todos os anos únicos e ordena
  
    anos.forEach((ano) => {
      const anoData: { ano: number, [municipio: string]: number } = { ano };
  
      // Calcula a variação do PIB para cada município em relação ao ano anterior
      toCompare.forEach((municipio) => {
        const pibAnoAtual = processedData[municipio]?.[ano] || 0;
        const anoAnterior = anos[anos.indexOf(ano) - 1]; // Pega o ano anterior
        const pibAnoAnterior = processedData[municipio]?.[anoAnterior] || 0;
  
        const variacao = pibAnoAnterior > 0 ? ((pibAnoAtual - pibAnoAnterior) / pibAnoAnterior) * 100 : 0;
  
        anoData[municipio] = variacao; // Adiciona a variação para o município
      });
  
      result.push(anoData); // Adiciona o objeto de ano com as variações para os municípios
    });
  
    return result;
  };
  