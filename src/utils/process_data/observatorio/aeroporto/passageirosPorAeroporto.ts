export const processPassageirosPorAeroporto = (data: any[], year: string) => {
    return data
      .filter((item) => item["ANO"] === year)
      .reduce((acc: any, item: any) => {
        const aeroporto = item["AEROPORTO NOME"] || "Indefinido";
        const passageiros = parseFloat(
          (item["PASSAGEIRO"] || "0").replace(/\./g, "").replace(",", ".")
        );
  
        if (!acc[aeroporto]) {
          acc[aeroporto] = { aeroporto, total: 0 };
        }
  
        acc[aeroporto].total += passageiros;
  
        return acc;
      }, {});
  };
  

  export const preparePassageirosPorAeroportoData = (data: any[], year: string) => {
    const processed = processPassageirosPorAeroporto(data, year);
    return Object.values(processed).sort((a: any, b: any) => b.total - a.total);
  };
  