export const processPassageirosPorNatureza = (
  data: any[],
  year: string,
  aeroportoNome: string
) => {
  // Filtra os dados pelo ano e pelo nome do aeroporto
  return data.reduce((acc: any, item: any) => {
    if (item["ANO"] !== year || item["AEROPORTO NOME"] !== aeroportoNome)
      return acc; // Filtra os dados por ano e aeroporto

    const natureza = item["NATUREZA"] || "Indefinida"; // Caso não tenha natureza, define como Indefinida
    const passageiros = parseFloat(
      (item["PASSAGEIRO"] || "0").replace(/\./g, "").replace(",", ".") // Converte o número de passageiros para número
    );

    if (!acc[natureza]) {
      acc[natureza] = { natureza, total: 0 }; // Inicializa a natureza com total zerado
    }

    acc[natureza].total += passageiros; // Soma os passageiros na natureza correspondente

    return acc;
  }, {});
};

export const preparePassageirosPorNaturezaData = (
  data: any[],
  year: string,
  aeroportoNome: string
) => {
  const processed = processPassageirosPorNatureza(data, year, aeroportoNome); // Passa ano e nome do aeroporto para o filtro
  return Object.values(processed); // Transforma o objeto em array para uso no gráfico
};
