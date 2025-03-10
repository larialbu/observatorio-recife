    export const processCargaAnoAena = (data: any[]) => {
    // Inicializa os dados processados com os meses
    const meses = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  
    const processedData = meses.map((mes) => ({
      mes, // Número do mês
      quantidade: 0, // Inicializando com quantidade zero
    }));
  
    // Agora percorremos os dados para processar
    data.forEach((item) => {
      const quantidade = parseFloat(
        (item["Quantidade"] || "0").toString().replace(/\./g, "").replace(",", ".")
      ); // Convertendo a quantidade para número, lidando com possíveis pontos e vírgulas
  
      const mes = item["Mês"]; // Pegando o mês
  
      // Pegando o índice do mês na array de meses
      const mesIndex = parseInt(mes, 10) - 1;
      if (processedData[mesIndex]) {
        processedData[mesIndex].quantidade += quantidade; // Somando a quantidade no mês correspondente
      }
    });
  
    // Formata os meses para exibir no formato "jan", "fev", etc.
    return processedData.map((item) => ({
      ...item,
      mes: new Date(0, parseInt(item.mes, 10) - 1).toLocaleString("pt-BR", {
        month: "short",
      }), // Formata o mês para exibir o nome abreviado
    }));
  };
  