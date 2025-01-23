export const processMunicipiosCompetitividade = (data: any): { ano: string; [key: string]: number | string }[] => {
    const municipiosSet = new Set<string>();
  
    // Extrai os municípios únicos de todos os anos
    Object.keys(data).forEach((year) => {
      data[year].filteredData.forEach((item: any) => {
        const municipioNome = item["Município"];
        municipiosSet.add(municipioNome);
      });
    });
  
    const municipios = Array.from(municipiosSet).slice(0, 30);
  
    // Inicializa os dados processados com os anos e municípios
    const processedData = Object.keys(data).map((year) => {
      const result: { ano: string; [key: string]: number | string } = { ano: year };
      municipios.forEach((municipio) => {
        result[municipio] = 0;
      });
  
      // Processa os dados do ano
      data[year].filteredData.forEach((item: any) => {
        const colocacao = parseInt(item["Colocação"], 10) || 0;
        const municipioNome = item["Município"];
  
        if (municipios.includes(municipioNome)) {
          result[municipioNome] = (result[municipioNome] as number) + colocacao; // Soma a colocação por município
        }
      });
  
      return result;
    });
  
    return processedData;
  };