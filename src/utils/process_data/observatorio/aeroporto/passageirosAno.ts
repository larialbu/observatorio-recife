export const processPassageirosAno = (
  data: any[],
  year: string,
  aeroportoNome: string // Nome do aeroporto, externo como esperado
) => {
  // Aqui é uma array com 12 objetos, sendo 1 para cada mês do ano né
  const meses = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  const processedData = meses.map((mes) => ({
    mes, // Número do mês mano
    passageiros: 0, // Inicializando os passageiros como zero
  }));

  data.forEach((item) => {
    // Verificador de ano e nome do aeroporto
    if (item["ANO"] !== year || item["AEROPORTO NOME"] !== aeroportoNome) return;

    const passageiros = parseFloat(
      (item["PASSAGEIRO"] || "0").replace(/\./g, "").replace(",", ".")
    ); // Aqui transforma pra número e remove formatação

    const mes = item["MÊS"]; // Pegando o mês, óbvio

    // Pegando o índice do mês na array de meses, 10 é pra garantir que é decimal
    const mesIndex = parseInt(mes, 10) - 1;
    if (processedData[mesIndex]) {
      processedData[mesIndex].passageiros += passageiros; // Soma os passageiros no mês correspondente
    }
  });

  return processedData.map((item) => ({
    ...item,
    mes: new Date(0, parseInt(item.mes, 10) - 1).toLocaleString("pt-BR", {
      month: "short",
    }), // Isso aqui formata pra um formato bonitinho tipo "jan", "fev", etc.
  }));
};
