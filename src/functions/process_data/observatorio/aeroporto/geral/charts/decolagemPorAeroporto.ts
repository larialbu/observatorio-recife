export const processDecolagensPorAeroporto = (data: any[]) => {

  const processedData = data.reduce((acc: any, item: any) => {
    const aeroporto = item["AEROPORTO NOME"] || "Indefinido";
    
    const decolagens = parseFloat(
      (item["DECOLAGENS"] || "0")
    );

    if (!acc[aeroporto]) {
      acc[aeroporto] = { aeroporto, totalDecolagens: 0 };
    }

    acc[aeroporto].totalDecolagens += decolagens;

    return acc;
  }, {});

  // Ordena pelos aeroportos com mais decolagens
  return Object.values(processedData).sort(
    (a: any, b: any) => b.totalDecolagens - a.totalDecolagens
  );
};
