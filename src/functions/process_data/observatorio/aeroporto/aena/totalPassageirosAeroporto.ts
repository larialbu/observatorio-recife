export const processPassageirosPorAeroportoAena = (data: any[]) => {
    // Reduz os dados para calcular o total de passageiros por aeroporto
    const processedData = data.reduce((acc: any, item: any) => {
      const aeroporto = item["Aeroporto"] || "Indefinido"; // Pegando o nome do aeroporto
      const passageiros = parseInt(
        (item["Passageiros"] || "0").replace(/\./g, "").replace(",", "") // Converte a quantidade de passageiros para número
      );
  
      if (!acc[aeroporto]) {
        acc[aeroporto] = { aeroporto, totalPassageiros: 0 }; // Se o aeroporto não existir, inicializa com total de passageiros 0
      }
  
      acc[aeroporto].totalPassageiros += passageiros; // Soma os passageiros no aeroporto correspondente
  
      return acc;
    }, {});
  
    // Converte o objeto em uma lista e ordena pela quantidade de passageiros (descendente)
    return Object.values(processedData).sort(
      (a: any, b: any) => b.totalPassageiros - a.totalPassageiros // Ordena pela quantidade de passageiros
    );
  };
  