import { groupsDataIPCA } from "@/@types/observatorio/ipca/groupsDataIPCA";

interface ChartData {
  month: string; // Grupo
  uv: number;
  pv: number; // Índice
  total: number;
}

export function getFiveGroups(
  jsonData: groupsDataIPCA[],
  mesFiltro: string
  // cidadeFiltro: string // Novo parâmetro para filtrar pela cidade
): ChartData[] {
  // Filtra os dados para o mês e a cidade especificados
  // const dadosFiltrados = jsonData.filter(
  //   (item) => item.Data === mesFiltro && item.Capital === cidadeFiltro
  // );

  const dadosFiltrados = jsonData.filter(
    (item) => item.Data === mesFiltro && item.Capital === "Recife"
  );

  // Mapeia os dados para o formato de ChartData com o índice em formato decimal
  const chartData: ChartData[] = dadosFiltrados.map((item, i) => ({
    month: item.Grupo,
    uv: 0,
    pv: parseFloat(item.Indice.replace(",", ".")) || 0,
    total: 15,
  }));

  // Ordena os dados pelo índice em ordem decrescente e retorna os 5 maiores
  const top5Indices = chartData.sort((a, b) => b.pv - a.pv).slice(0, 5);

  return top5Indices;
}
