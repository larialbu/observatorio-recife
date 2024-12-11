export const processCargaPorAeroporto = (data: any[], year: string) => {
    const processedData = data.reduce((acc: any, item: any) => {
      if (item["ANO"] !== year) return acc; // Filtra pelo ano
  
      const aeroporto = item["AEROPORTO NOME"] || "Indefinido"; // Caso não tenha nome, define como Indefinido
      const carga = parseFloat(
        (item["CARGA"] || "0").replace(/\./g, "").replace(",", ".")
      ); // Converte para número
  
      if (!acc[aeroporto]) {
        acc[aeroporto] = { aeroporto, totalCarga: 0 }; // Inicializa com carga zero
      }
  
      acc[aeroporto].totalCarga += carga; // Soma a carga no aeroporto correspondente
  
      return acc;
    }, {});
  
    // Converte o objeto em um array e ordena pelos maiores valores
    return Object.values(processedData).sort(
      (a: any, b: any) => b.totalCarga - a.totalCarga
    );
  };
  