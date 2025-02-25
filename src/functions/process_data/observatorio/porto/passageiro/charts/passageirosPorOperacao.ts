export const processPassageirosPorOperacao = (data: any[]) => {
    // Reduz os dados por classificação de viagem
    return data.reduce((acc: any, item: any) => {
      const operacao = item["Operação"] || "Indefinida";
      
      const passageiros = item["Passageiros"] || 0 
 
  
      if (!acc[operacao]) {
        acc[operacao] = { operacao, total: 0 };
      }
  
      acc[operacao].total += passageiros;
  
      return acc;
    }, {});
  };
  
  export const preparePassageirosPorOperacaoData = (data: any[]) => {
    const processed = processPassageirosPorOperacao(data);
    
    // Retorna um array no formato desejado
    return Object.values(processed).map((item: any) => ({
      operacao: item.operacao,
      total: item.total
    }));
  };
  