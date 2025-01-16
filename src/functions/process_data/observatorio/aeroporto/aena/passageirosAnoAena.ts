export const processPassageirosAnoAena = (data: any[]) => {
  // Inicializa os dados processados com os meses
  const meses = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  // Cria um array para armazenar o total de passageiros por mês
  const processedData = meses.map((mes) => ({
    mes,
    passageiros: 0, 
  }));

  // Agora percorremos os dados para processar
  data?.forEach((item) => {
    const passageiros = parseFloat(
      (item["Passageiros"] || "0").replace(/\./g, "").replace(",", ".")
    ); // Transforma pra número e remove formatação

    const mes = item["Mês"];

    // Pegando o índice do mês na array de meses, 10 é pra garantir que é de base decimal
    const mesIndex = parseInt(mes, 10) - 1;
    if (processedData[mesIndex]) {
      processedData[mesIndex].passageiros += passageiros; // Soma os passageiros no mês correspondente
    }
  });

  // Formata os meses pra exibir bonitinho no resultado final
  return processedData.map((item) => ({
    ...item,
    mes: new Date(0, parseInt(item.mes, 10) - 1).toLocaleString("pt-BR", {
      month: "short",
    }), // Isso aqui formata pra um formato bonitinho tipo "jan", "fev", etc.
  }));
};
