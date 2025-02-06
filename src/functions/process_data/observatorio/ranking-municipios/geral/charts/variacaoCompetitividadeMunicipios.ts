export const processVariacaoPosicao = (
    data: any
  ): { ano: any | string; [key: string]: number }[] => {
    // 1) Extrair os anos e ordenar
    const sortedYears = Object.keys(data).sort();
  
    // 2) Criar um Set com todos os municípios encontrados
    const municipiosSet = new Set<string>();
    sortedYears.forEach((year) => {
      data[year].filteredData.forEach((item: any) => {
        municipiosSet.add(item["Município"]);
      });
    });
  
    // 3) Converter o Set de municípios em array e ordenar alfabeticamente
    const allMunicipios = Array.from(municipiosSet).sort();
  
    // 4) Limitar aos top 25 municípios ordenados alfabeticamente
    const top25 = allMunicipios.slice(0, 25);
  
    // 5) Processar os dados com base em Delta colocação
    const processedData: { ano: any | string; [key: string]: number }[] = [];
  
    sortedYears.forEach((year) => {
      const anoData: { [key: string]: number | string } = { ano: year };
  
      // Para cada município no top25
      top25.forEach((municipio) => {
        const municipioData = data[year].filteredData.find(
          (item: any) => item["Município"] === municipio
        );
  
        // Usar "Delta colocação" se disponível; caso contrário, 0
        anoData[municipio] = municipioData
          ? parseInt(municipioData["Delta colocação"], 10) || 0
          : 0;
      });
  
      processedData.push(anoData as any);
    });
  
    return processedData;
  };
  