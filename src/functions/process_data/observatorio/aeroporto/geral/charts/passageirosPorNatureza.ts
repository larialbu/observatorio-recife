export const processPassageirosPorNatureza = (data: any[]) => {
  // Reduz os dados por natureza
  return data.reduce((acc: any, item: any) => {
    const natureza = item["NATUREZA"] || "Indefinida";
    
    const passageiros = parseFloat(
      (item["PASSAGEIRO"] || "0")
    );

    if (!acc[natureza]) {
      acc[natureza] = { natureza, total: 0 };
    }

    acc[natureza].total += passageiros;

    return acc;
  }, {});
};

export const preparePassageirosPorNaturezaData = (data: any[]) => {
  const processed = processPassageirosPorNatureza(data);
  
  return Object.values(processed);
};
