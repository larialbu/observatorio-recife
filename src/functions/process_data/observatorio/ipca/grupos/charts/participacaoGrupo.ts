export const processPercentageByType = (
    data: any[],
    type: "grupo" | "subgrupo" | "item" | "subitem"
  ) => {
    // Determina a chave de agrupamento com base no tipo fornecido
    const key = {
      grupo: "Grupo",
      subgrupo: "Subgrupo",
      item: "Item",
      subitem: "SubItem",
    }[type];
  
    // Reduz os dados para calcular o total do índice por nível especificado
    const processedData = data.reduce((acc: any, item: any) => {
      const groupKey = item[key] || "Indefinido";
      const indice = parseFloat((item["Indice"] || "0")); // Converte o índice para número
  
      if (!acc[groupKey]) {
        acc[groupKey] = { key: groupKey, totalIndice: 0 };
      }
  
      acc[groupKey].totalIndice += indice;
  
      return acc;
    }, {});
  
    // Calcula o índice total geral
    const totalGeralIndice = Object.values(processedData).reduce(
      (total: number, group: any) => total + group.totalIndice,
      0
    );
  
    // Calcula a porcentagem de cada agrupamento em relação ao total geral
    return Object.values(processedData)
      .map((group: any) => ({
        [type]: group.key,
        porcentagem: (group.totalIndice / totalGeralIndice) * 100, // Porcentagem como número
      }))
      .sort(
        (a: any, b: any) => b.porcentagem - a.porcentagem // Ordena pela maior porcentagem
      );
  };
  