export const processBrasilVariacaoMensal = (data: any[]) => {
    // Filtra os dados para excluir itens com Capital 'Brasil'
    const filteredData = data.filter(
      (item) => item["Capital"] === "Brasil"
    );
  
    // Array com 12 objetos, um para cada mês
    const meses = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  
    // Inicializa os dados processados com os meses
    const processedData = meses.map((mes) => ({
      mes, // Número do mês
      variaçãoMensal: 0, // Inicializando com variação zero
    }));
  
    // Percorre os dados filtrados para processar
    filteredData.forEach((item) => {
      // Converte a variação mensal para número
      const variaçãoMensal = parseFloat(
        (item["IPCA - Variação acumulado no ano"] || "0")
      );
  
      const mes = item["MÊS"]; // Pega o mês
  
      // Índice do mês na array de meses (0-based)
      const mesIndex = parseInt(mes, 10) - 1;
  
      // Verifica se o índice do mês é válido
      if (processedData[mesIndex]) {
        processedData[mesIndex].variaçãoMensal += variaçãoMensal; // Soma a variação no mês correspondente
      }
    });
  
    // Formata os meses para exibir no resultado final
    return processedData.map((item) => ({
      ...item,
      mes: new Date(0, parseInt(item.mes, 10) - 1).toLocaleString("pt-BR", {
        month: "short",
      }), // Formata para "jan", "fev", etc.
    }));
  };
  