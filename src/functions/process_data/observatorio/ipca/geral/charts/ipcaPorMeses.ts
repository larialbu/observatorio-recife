export const processVariacaoMensal = (data: any[]): { mes: string; [key: string]: number | string }[] => {
  // Filtra os dados para excluir itens com Capital 'Brasil'
  const filteredData = data.filter(
    (item) => item["Capital"] !== "Brasil"
  );

  // Extrai as categorias únicas presentes nos dados
  const categoriasSet = new Set<string>();
  filteredData.forEach((item) => {
    const categoriaNome = item["Capital"];
    categoriasSet.add(categoriaNome);
  });

  // Converte para array e limita a 5 categorias
  const categorias = Array.from(categoriasSet);

  // Inicializa os meses
  const meses = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  // Inicializa os dados processados com os meses e categorias
  const processedData = meses.map((mes) => {
    const result: { mes: string; [key: string]: number | string } = { mes };
    categorias.forEach((categoria) => {
      result[categoria] = 0;
    });
    return result;
  });

  // Processa os dados
  filteredData.forEach((item) => {
    const variacaoMensal = parseFloat(
      (item["variação mensal"] || "0").replace(",", ".")
    ); // Transforma para número e remove formatação

    const mes = item["MÊS"];
    const categoriaNome = item["Capital"]; // Assumindo que "Capital" é a categoria

    // Verifica se a categoria está dentro das categorias selecionadas
    if (categorias.includes(categoriaNome)) {
      const mesIndex = parseInt(mes, 10) - 1;
      if (processedData[mesIndex]) {
        processedData[mesIndex][categoriaNome] =
          (processedData[mesIndex][categoriaNome] as number) + variacaoMensal; // Soma a variação no mês e categoria correspondente
      }
    }
  });

  // Formata os meses para exibir no resultado final
  return processedData.map((item) => ({
    ...item,
    mes: new Date(0, parseInt(item.mes as string, 10) - 1).toLocaleString("pt-BR", {
      month: "short",
    }), // Formata para um formato tipo "jan", "fev", etc.
  }));
};
