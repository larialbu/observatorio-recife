export const processCargasPorAeroportoAena = (data: any[]) => {
    // Reduz os dados para calcular o total de carga por aeroporto
    const processedData = data.reduce((acc: any, item: any) => {
      const aeroporto = item["Aeroporto"] || "Indefinido"; // Pegando o nome do aeroporto
      const quantidade = parseFloat(
        (item["Quantidade"] || "0").toString().replace(/\./g, "").replace(",", ".") // Converte a quantidade de carga para número
      );
  
      if (!acc[aeroporto]) {
        acc[aeroporto] = { aeroporto, totalCarga: 0 }; // Se o aeroporto não existir, inicializa com total de carga 0
      }
  
      acc[aeroporto].totalCarga += quantidade; // Soma a carga no aeroporto correspondente
  
      return acc;
    }, {});
  
    // Converte o objeto em uma lista e ordena pela quantidade de carga (descendente)
    return Object.values(processedData).sort(
      (a: any, b: any) => b.totalCarga - a.totalCarga // Ordena pela quantidade de carga
    );
  };
  