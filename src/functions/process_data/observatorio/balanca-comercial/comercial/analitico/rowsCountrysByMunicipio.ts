export const rowsCountrysByMunicipio = (data: any[], municipio: string, year: string, month?: string) => {
    // Filtra os dados pelo município, ano e, se fornecido, mês
    const filteredData = data.filter(item => 
      item["Município"] === municipio && 
      item["Ano"] === year &&
      (!month || item["Mês"] === month)  // Filtra pelo mês se ele for fornecido
    );
  
    // Agrega os dados por país
    const aggregatedData = filteredData.reduce((acc: any, item: any) => {
      const pais = item["País"];
      const valor = Number(item["Valor US$"]) || 0;
  
      // Inicializa o país no acumulador se não existir
      if (!acc[pais]) {
        acc[pais] = { PAÍS: pais, NEGOCIADO: 0 };
      }
  
      // Soma o valor negociado para o país
      acc[pais].NEGOCIADO += valor;
  
      return acc;
    }, {});
  
    // Converte o objeto acumulado em um array
    const aggregatedArray = Object.values(aggregatedData);
  
    // Calcula o total negociado com todos os países
    const totalNegociado: any = aggregatedArray.reduce((total, item: any) => total + item.NEGOCIADO, 0);
  
    // Calcula a participação de cada país
    return aggregatedArray.map((item: any) => ({
      PAÍS: item.PAÍS,
      PARTICIPAÇÃO: (item.NEGOCIADO / totalNegociado) * 100, // Calculando a porcentagem
      NEGOCIADO: item.NEGOCIADO
    }));
  };