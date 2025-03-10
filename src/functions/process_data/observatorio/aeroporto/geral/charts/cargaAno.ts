export const processCargaAno = (data: any[]) => {
  // Aqui é uma array com 12 objetos, sendo 1 para cada mês do ano né
  const meses = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  // Inicializa os dados processados com os meses
  const processedData = meses.map((mes) => ({
    mes,
    carga: 0,
  }));

  data.forEach((item) => {
    const carga = parseFloat(
      (item["CARGA"] || "0")
    );

    const mes = item["MÊS"]; // Pegando o mês, óbvio

    // Pegando o índice do mês na array de meses, 10 é pra garantir que é decimal
    const mesIndex = parseInt(mes, 10) - 1;
    if (processedData[mesIndex]) {
      processedData[mesIndex].carga += carga; // Soma a carga no mês correspondente
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
