function transformarParaNumero(valor: string): number {
  // Remove pontos separadores de milhares e troca a vírgula decimal por ponto
  return parseFloat(valor.replace(/\./g, "").replace(",", "."));
}

interface ChartData {
  month: string; // Nome do Município (Capital)
  uv: 0;
  pv: number; // PIB per capita
}

export function getPIB(
  jsonData: BruteDataPIB[],
  anoFiltro: string
): ChartData[] {
  // Filtra os dados para capitais do Nordeste no ano especificado
  const dadosFiltrados = jsonData.filter(
    (item) =>
      item["Ano"] === anoFiltro &&
      item["Nome da Grande Região"].toLowerCase() === "nordeste" &&
      item["Principais Capitais"].toLowerCase() === "s"
  );

  // Mapeia os dados para o formato ChartData, convertendo PIB per capita para número decimal
  const chartData: ChartData[] = dadosFiltrados.map((item) => ({
    month: item["Nome do Município"], // Nome do Município (Capital)
    uv: 0,
    pv: transformarParaNumero(item["__parsed_extra"][0]) || 0,
  }));

  return chartData;
}
