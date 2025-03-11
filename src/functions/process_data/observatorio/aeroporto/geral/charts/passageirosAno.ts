const parsePassageiros = (passageiros: any): number => {
  const parsed = parseFloat(
    (passageiros || "0")
  );
  return isNaN(parsed) ? 0 : parsed;
};

export const processPassageirosAno = (data: any[]) => {
  // Aqui é uma array com 12 objetos, sendo 1 para cada mês do ano né
  const meses = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  // Inicializa os dados processados com os meses
  const processedData = meses.map((mes) => ({
    mes,
    passageiros: 0,
  }));

  // Agora percorremos os dados pra processar
  data.forEach((item) => {
    const passageiros = parsePassageiros(item["PASSAGEIRO"]); // Usa a função parsePassageiros para conversão
    const mes = item["MÊS"];

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
