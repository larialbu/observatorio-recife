interface EmpregoData {
  Admissões: string;
  Capital: string;
  Código: string;
  Data: string; // Exemplo: "janeiro/2021"
  Demissões: string;
  Estoque: string;
  Municipio: string;
  Região: string;
  Saldos: string;
  UF: string;
  VariacaoRelativa: string;
  Variação: string;
}

interface ChartData {
  month: string; // admissão, demissão, saldo
  uv: 0;
  pv: number; // quantidade
}

export function getJobs(
  jsonData: EmpregoData[],
  anoFiltro: string
): ChartData[] {
  // Filtra os dados para incluir apenas os registros do ano especificado
  const dadosFiltrados = jsonData.filter((item) =>
    item.Data.includes(anoFiltro)
  );

  // Inicializa variáveis para acumular os totais de admissões, demissões e saldos
  let totalAdmissoes = 0;
  let totalDemissoes = 0;
  let totalSaldos = 0;

  dadosFiltrados.forEach((item) => {
    totalAdmissoes += parseInt(item.Admissões) || 0;
    totalDemissoes += parseInt(item.Demissões) || 0;
    totalSaldos += parseInt(item.Saldos) || 0;
  });

  // Retorna os dados no formato ChartData
  return [
    { month: "Admissões", uv: 0, pv: totalAdmissoes },
    { month: "Demissões", uv: 0, pv: totalDemissoes },
    { month: "Saldos", uv: 0, pv: totalSaldos },
  ];
}
