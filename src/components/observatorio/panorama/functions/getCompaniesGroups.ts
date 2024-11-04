interface EmpresaData {
  Grupo: string;
  atividade_predominante: string;
  atividade_principal: string;
  atividade_vig_sanitaria: string;
  cnae: string;
  cnpj: string;
  cod_bairro: string;
  cod_grupo: string;
  cod_logradouro: string;
  data_abertura_empresa: string; // Exemplo: "2023-11-08"
  data_encerramento: string;
  desc_atividade: string;
  incomodo: string;
  latitude: string;
  longitude: string;
  nome_bairro: string;
  nome_fantasia: string;
  nome_grupo: string;
  nome_logradouro: string;
  numero_lote: string;
  numero_residencia: string;
  razao_social: string;
  situacao_empresa: string;
}

interface ChartData {
  month: string; // grupo
  uv: 0;
  pv: number; // porcentagem
}

export function getCompany(
  jsonData: EmpresaData[],
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
      pv: parseFloat(porcentagem.toFixed(2)), // Converte para decimal com duas casas
    };
  });

  return chartData;
}
