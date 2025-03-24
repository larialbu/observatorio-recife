export const processPassageirosPorAeroporto = (data: any[]) => {

  return data.reduce((acc: any, item: any) => {
    const aeroporto = item["AEROPORTO NOME"] || "Indefinido";

    const passageiros = parseFloat(
      (item["PASSAGEIRO"] || "0")
    );

    if (!acc[aeroporto]) {
      acc[aeroporto] = { aeroporto, total: 0 };
    }

    acc[aeroporto].total += passageiros;

    return acc;
  }, {});
};

export const preparePassageirosPorAeroportoData = (data: any[]) => {
  const processed = processPassageirosPorAeroporto(data);
  
  return Object.values(processed).sort((a: any, b: any) => b.total - a.total);
};
