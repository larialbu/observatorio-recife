export const processPassageirosAnoComparativo = (
  data: any[],
  aeroportos: string[]
): { mes: string; [key: string]: number | string }[] => {
  // Validação para aceitar no máximo 5 aeroportos

  // Inicializa os meses
  const meses = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  // Inicializa os dados processados com os meses
  const processedData = meses.map((mes) => {
    const result: { mes: string; [key: string]: number | string } = { mes };
    aeroportos.forEach((aeroporto) => {
      result[aeroporto] = 0;
    });
    return result;
  });

  // Processa os dados
  data.forEach((item) => {
    const passageiros = parseFloat(
      (item["PASSAGEIRO"] || "0").replace(/\./g, "").replace(",", ".")
    ); // Transforma para número e remove formatação

    const mes = item["MÊS"];
    const aeroportoNome = item["AEROPORTO NOME"];

    // Verifica se o aeroporto está na lista fornecida
    if (aeroportos.includes(aeroportoNome)) {
      const mesIndex = parseInt(mes, 10) - 1;
      if (processedData[mesIndex]) {
        processedData[mesIndex][aeroportoNome] =
          (processedData[mesIndex][aeroportoNome] as number) + passageiros; // Soma os passageiros no mês e aeroporto correspondente
      }
    }
  });

  // Formata os meses para exibir no resultado final
  return processedData.map((item) => ({
    ...item,
    mes: new Date(0, parseInt(item.mes as string, 10) - 1).toLocaleString(
      "pt-BR",
      {
        month: "short",
      }
    ), // Formata para um formato tipo "jan", "fev", etc.
  }));
};
