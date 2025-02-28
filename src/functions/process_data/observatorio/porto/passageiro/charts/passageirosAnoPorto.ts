export const processPassageirosAnoPorto = (current: any[], past: any[]) => {
    // Inicializa os dados processados com os meses
    const meses = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
    
    // Cria um array para armazenar o total de passageiros por mês
    const processedData = meses.map((mes) => ({
      mes,
      current: 0, // Passageiros do ano atual
      past: 0, // Passageiros do ano passado
      variation: 0, // Variação entre o ano atual e o passado
    }));
    
    // Processa os dados do ano atual (current)
    current?.forEach((item) => {
      const passageiros = item["Passageiros"] || 0; // Transforma pra número e remove formatação
      const mes = item["Mes"];
      
      const mesIndex = parseInt(mes, 10) - 1;
      if (processedData[mesIndex]) {
        processedData[mesIndex].current += passageiros; // Soma os passageiros no mês atual
      }
    });
  
    // Processa os dados do ano passado (past)
    past?.forEach((item) => {
      const passageiros = item["Passageiros"] || 0; // Transforma pra número e remove formatação
      const mes = item["Mes"];
      
      const mesIndex = parseInt(mes, 10) - 1;
      if (processedData[mesIndex]) {
        processedData[mesIndex].past += passageiros; // Soma os passageiros no mês passado
      }
    });
    
    // Calcula a variação e formata os meses para exibir bonitinho
    return processedData.map((item) => {
      const variation = item.past > 0 ? ((item.current - item.past) / item.past) * 100 : 0; // Calcula a variação em porcentagem
      
      return {
        ...item,
        variation: +variation.toFixed(2), // Variação formatada com 2 casas decimais
        mes: new Date(0, parseInt(item.mes, 10) - 1).toLocaleString("pt-BR", {
          month: "short",
        }), // Formata o mês para "jan", "fev", etc.
      };
    });
  };
  