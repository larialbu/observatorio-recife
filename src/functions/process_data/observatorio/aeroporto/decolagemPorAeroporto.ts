export const processDecolagensPorAeroporto = (data: any[], year: string) => {
    const processedData = data.reduce((acc: any, item: any) => {
      if (item["ANO"] !== year) return acc; // Filtra pelo ano
  
      const aeroporto = item["AEROPORTO NOME"] || "Indefinido"; // Caso não tenha nome, define como Indefinido
      const decolagens = parseFloat(
        (item["DECOLAGENS"] || "0").replace(/\./g, "").replace(",", ".")
      ); // Converte para número
  
      if (!acc[aeroporto]) {
        acc[aeroporto] = { aeroporto, totalDecolagens: 0 }; // Inicializa com zero decolagens
      }
  
      acc[aeroporto].totalDecolagens += decolagens; // Soma as decolagens do aeroporto correspondente
  
      return acc;
    }, {});
  
    // Converte o objeto em um array e ordena pelos maiores valores
    return Object.values(processedData).sort(
      (a: any, b: any) => b.totalDecolagens - a.totalDecolagens
    );
  };
  