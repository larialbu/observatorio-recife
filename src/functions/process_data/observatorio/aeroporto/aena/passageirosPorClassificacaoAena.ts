export const processPassageirosPorClassificacao = (data: any[]) => {
    // Reduz os dados por classificação de viagem
    return data.reduce((acc: any, item: any) => {
      const classificacao = item["Classificacao da Viagem"] || "Indefinida";
      
      const passageiros = parseFloat(
        (item["Passageiros"] || "0").toString()
      );
  
      if (!acc[classificacao]) {
        acc[classificacao] = { classificacao, total: 0 };
      }
  
      acc[classificacao].total += passageiros;
  
      return acc;
    }, {});
  };
  
  export const preparePassageirosPorClassificacaoData = (data: any[]) => {
    const processed = processPassageirosPorClassificacao(data);
    
    // Retorna um array no formato desejado
    return Object.values(processed).map((item: any) => ({
      classificação: item.classificacao,
      total: item.total
    }));
  };
  