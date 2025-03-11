export const rowsCountrysByMunicipio = (data: any[], municipio: string, year: string, month?: number) => {
  const filteredData = data.filter(item => 
    item["Município"] === municipio && 
    item["Ano"].toString() === year &&
    (!month || +item["Mês"] === month)   
  );
  
  const aggregatedData = filteredData.reduce((acc: any, item: any) => {
    const pais = item["País"];
    const valor = Number(item["Valor US$"]) || 0;
    const tipo = item["tipo"];  
  
    if (!acc[pais]) {
      acc[pais] = { 
        PAÍS: pais, 
        IMPORTACAO: 0, 
        EXPORTACAO: 0,
        NEGOCIADO: 0 
      };
    }
  
    if (tipo === "Importação") {
      acc[pais].IMPORTACAO += valor;
    } else if (tipo === "Exportação") {
      acc[pais].EXPORTACAO += valor;
    }
  
    acc[pais].NEGOCIADO += valor;
  
    return acc;
  }, {});
  
  const aggregatedArray = Object.values(aggregatedData);
  
  const totalNegociado: any = aggregatedArray.reduce((total, item: any) => total + item.NEGOCIADO, 0);
  
  return aggregatedArray.map((item: any) => ({
    PAÍS: item.PAÍS,
    PARTICIPAÇÃO: (item.NEGOCIADO / totalNegociado) * 100,  
    NEGOCIADO: item.NEGOCIADO,
    IMPORTAÇÃO: item.IMPORTACAO,
    EXPORTAÇÃO: item.EXPORTACAO,
  })).sort((a, b) => b.NEGOCIADO - a.NEGOCIADO);
};
