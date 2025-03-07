export const processMunicipiosCompetitividade = (
  data: any
): { ano: string; [key: string]: number | string }[] => {
  const municipiosSet = new Set<string>();

  // --- 1) Extrai os municípios únicos de todos os anos
  const allYears = Object.keys(data); 
  allYears.forEach((year) => {
    data[year].filteredData.forEach((item: any) => {
      const municipioNome = item["Município"];
      municipiosSet.add(municipioNome);
    });
  });

  // --- 2) Ordena os municípios em ordem alfabética e limita a 25
  const municipios = Array.from(municipiosSet)
    .sort() // <-- ordena alfabeticamente
    .slice(0, 25);

  // --- 3) Se quiser, também ordena os anos (opcional, se fizer sentido):
  const sortedYears = allYears.sort(); // Se ano for string, ajusta ou converte antes se precisar

  // --- 4) Monta o array final dos dados processados
  const processedData = sortedYears.map((year) => {
    const result: { ano: string; [key: string]: number | string } = {
      ano: year,
    };

    // Inicializa todos os municípios com 0
    municipios.forEach((municipio) => {
      result[municipio] = 0;
    });

    // Some a “colocação” para cada município naquele ano
    data[year].filteredData.forEach((item: any) => {
      const colocacao = parseInt(item["Colocação"], 10) || 0;
      const municipioNome = item["Município"];

      if (municipios.includes(municipioNome)) {
        result[municipioNome] =
          (result[municipioNome] as number) + colocacao;
      }
    });

    return result;
  });

  return processedData;
};
