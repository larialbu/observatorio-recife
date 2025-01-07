export const rowsSh4ByMunicipio = (data: any[], municipio: string, year: string, month?: number, country?: string) => {
    // Filtra os dados pelo município, ano, mês (se fornecido) e país (se fornecido)
    const filteredData = data.filter(item => 
      item["Município"] === municipio && 
      item["Ano"] === year &&
      (!month || +item["Mês"] === month) &&  // Filtra pelo mês se ele for fornecido
      (!country || item["País"] === country)  // Filtra pelo país se o parâmetro 'country' for fornecido
    );
  
    // Agrega os dados por código SH4
    const aggregatedData = filteredData.reduce((acc: any, item: any) => {
      const codigoSH4 = item["Codigo SH4"];
      const descricaoSH4 = item["Descrição SH4"];
  
      // Inicializa o código SH4 no acumulador se não existir
      if (!acc[codigoSH4]) {
        acc[codigoSH4] = { CODIGO_SH4: codigoSH4, DESCRICAO_SH4: descricaoSH4, NEGOCIADO: 0 };
      }
  
      // Soma o valor negociado (Valor US$) para o código SH4
      const valor = Number(item["Valor US$"]) || 0;
      acc[codigoSH4].NEGOCIADO += valor;
  
      return acc;
    }, {});
  
    // Converte o objeto acumulado em um array
    const aggregatedArray = Object.values(aggregatedData);
  
    // Retorna um array contendo o código SH4 e a descrição SH4
    return aggregatedArray.map((item: any) => ({
      CODIGO_SH4: item.CODIGO_SH4,
      DESCRICAO_SH4: item.DESCRICAO_SH4
    }));
};