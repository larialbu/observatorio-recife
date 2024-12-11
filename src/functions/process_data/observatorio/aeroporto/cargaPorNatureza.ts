export const processCargasPorNatureza = (data: any[], year: string, aeroportoNome: string) => {
    // Filtra os dados pelo ano e pelo nome do aeroporto
    return data.reduce((acc: any, item: any) => {
      if (item["ANO"] !== year || item["AEROPORTO NOME"] !== aeroportoNome) return acc; // Filtra os dados por ano e aeroporto
  
      const natureza = item["NATUREZA"] || "Indefinida"; // Caso não tenha natureza, define como Indefinida
      const carga = parseFloat(
        (item["CARGA"] || "0").replace(/\./g, "").replace(",", ".") // Converte a carga para número
      );
  
      if (!acc[natureza]) {
        acc[natureza] = { natureza, total: 0 }; // Inicializa a natureza com total zerado
      }
  
      acc[natureza].total += carga; // Soma a carga na natureza correspondente
  
      return acc;
    }, {});
  };
  
  export const prepareCargasPorNaturezaData = (data: any[], year: string, aeroportoNome: string) => {
    const processed = processCargasPorNatureza(data, year, aeroportoNome); // Passa ano e nome do aeroporto para o filtro
    return Object.values(processed); // Transforma o objeto em array para uso no gráfico
  };
  