export const processCargaPorAeroporto = (data: any[]) => {
  // Reduz os dados para calcular a carga total por aeroporto
  const processedData = data.reduce((acc: any, item: any) => {
    const aeroporto = item["AEROPORTO NOME"] || "Indefinido";
    const carga = parseFloat(
      (item["CARGA"] || "0")
    ); // Converte a carga para número

    if (!acc[aeroporto]) {
      acc[aeroporto] = { aeroporto, totalCarga: 0 };
    }

    acc[aeroporto].totalCarga += carga;

    return acc;
  }, {});

  // Converte o objeto em uma lista e ordena pela carga total (descendente)
  return Object.values(processedData).sort(
    (a: any, b: any) => b.totalCarga - a.totalCarga
  );
};
