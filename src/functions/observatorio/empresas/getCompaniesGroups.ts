import { ProcessedDataEmpresas } from "@/@types/observatorio/empresas/processedDataEmpresas";

interface ChartData {
  month: string; // grupo
  uv: 0;
  pv: number; // porcentagem
}

export function getCompany(
  jsonData: ProcessedDataEmpresas[],
  anoFiltro: string
): ChartData[] {
  // Filtra os dados para incluir apenas as empresas abertas no ano especificado
  const dadosFiltrados = jsonData.filter((item) =>
    item.data_abertura_empresa.startsWith(anoFiltro)
  );

  // Contagem total de empresas no ano especificado
  const totalEmpresas = dadosFiltrados.length;

  // Inicializa um mapa para acumular a contagem de empresas por grupo
  const contagemPorGrupo: Record<string, number> = {};

  dadosFiltrados.forEach((item) => {
    const grupo = item.Grupo;
    if (!contagemPorGrupo[grupo]) {
      contagemPorGrupo[grupo] = 0;
    }
    contagemPorGrupo[grupo]++;
  });

  // Calcula a porcentagem de cada grupo e cria o array de ChartData
  const chartData: ChartData[] = Object.keys(contagemPorGrupo).map((grupo) => {
    const porcentagem = (contagemPorGrupo[grupo] / totalEmpresas) * 100;
    return {
      month: grupo,
      uv: 0,
      // pv: parseFloat(porcentagem.toFixed(2)), // Converte para decimal com duas casas
      pv: contagemPorGrupo[grupo], // Converte para decimal com duas casas
    };
  });

  return chartData;
}
