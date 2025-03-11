export const processCargasPorMes = (current: any[], past: any[]) => {
    // Inicializa os dados processados com os meses
    const meses = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  
    // Cria um array para armazenar o total de carga por mês
    const processedData = meses.map((mes) => ({
      mes,
      current: 0, // Carga do porto do ano atual
      past: 0, // Carga do porto do ano passado
      variation: 0, // Variação entre o ano atual e o passado
    }));
  
    // Processa os dados do ano atual (current)
    current?.forEach((item) => {
      const carga = item["VLPesoCargaBruta"] || 0; // Carga bruta
      const mes = item["Mes"];
  
      const mesIndex = parseInt(mes, 10) - 1;
      if (processedData[mesIndex]) {
        processedData[mesIndex].current += carga; // Soma a carga no mês atual
      }
    });
  
    // Processa os dados do ano passado (past)
    past?.forEach((item) => {
      const carga = item["VLPesoCargaBruta"] || 0; // Carga bruta
      const mes = item["Mes"];
  
      const mesIndex = parseInt(mes, 10) - 1;
      if (processedData[mesIndex]) {
        processedData[mesIndex].past += carga; // Soma a carga no mês passado
      }
    });
  
    // Calcula a variação e formata os dados
    return processedData.map((item) => {
      const variation = item.past > 0 ? ((item.current - item.past) / item.past) * 100 : 0; // Calcula a variação em porcentagem
  
      return {
        mes: new Date(0, parseInt(item.mes, 10) - 1).toLocaleString("pt-BR", {
          month: "short",
        }), // Formata o mês para "jan", "fev", etc.
        current: item.current.toFixed(2), // Valor da carga do mês atual
        past: item.past.toFixed(2), // Valor da carga do mês passado
        variation: +variation.toFixed(2), // Variação formatada com 2 casas decimais
      };
    });
  };