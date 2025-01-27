export const getRawData = async ({applyGenericFilters ,service, nameFunc, currentYear, years, keyName, filters, lengthIgnore}: any) => {
      const indicadorDataByYear: Record<string, any[]> = {};

      // Busca os dados para todos os anos especificados
      for (const year of years) {
        const data = await service[nameFunc]();
        indicadorDataByYear[year] = data; // Organiza os dados por ano
      }

      // Aplica os filtros aos dados de cada ano sem interferir no ano selecionado
      const filteredData: Record<string, any[]> = {};
      Object.keys(indicadorDataByYear).forEach((year) => {
        // Aplica filtros apenas aos dados do ano específico
        filteredData[year] = applyGenericFilters(indicadorDataByYear[year], {
          ...filters,
          year,
        });
      });

  const indicadorFilter = Object.values(filters.additionalFilters).find((item: any) => item.label === keyName) as any;

  // Declare rawData fora da condicional
  let rawData = [];

  if (indicadorFilter && (lengthIgnore ? indicadorFilter.selected.length > 1 : indicadorFilter.selected)) {
    const selectedindicador = indicadorFilter.selected; // Aqui você pega os valores selecionados
    rawData = indicadorDataByYear[currentYear].filter((data) => {
      // Verifica se o valor de indicador no rawData corresponde ao que foi selecionado
      return selectedindicador.includes(data[keyName]); // Verifique se selectedindicador é um array
    });
  } else {
    rawData = indicadorDataByYear[currentYear] || []; // Caso não tenha filtro, retorna todos os dados do ano
  }

  // Definindo os dados brutos para o ano selecionado e filtrando com base no indicador
  console.log(rawData);

  return rawData
  }