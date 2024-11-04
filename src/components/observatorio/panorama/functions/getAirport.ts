interface VooData {
  ANO: string;
  "PASSAGEIROS GRÁTIS": string;
  "PASSAGEIROS PAGOS": string;
  "CARGA GRÁTIS (KG)": string;
  "CARGA PAGA (KG)": string;
}

interface ChartData {
  month: string; // "Passageiros" ou "Cargas"
  uv: 0;
  pv: number; // quantidade total
}

export function getAirport(
  jsonData: VooData[],
  anoFiltro: string
): ChartData[] {
  // Filtra os dados para incluir apenas registros do ano especificado
  const dadosFiltrados = jsonData.filter((item) => item.ANO === anoFiltro);

  // Inicializa contadores para passageiros e cargas
  let totalPassageiros = 0;
  let totalCargas = 0;

  // Soma as quantidades de passageiros e cargas
  dadosFiltrados.forEach((item) => {
    const passageirosGratuitos = parseInt(item["PASSAGEIROS GRÁTIS"]) || 0;
    const passageirosPagos = parseInt(item["PASSAGEIROS PAGOS"]) || 0;
    const cargaGratis = parseFloat(item["CARGA GRÁTIS (KG)"]) || 0;
    const cargaPaga = parseFloat(item["CARGA PAGA (KG)"]) || 0;

    totalPassageiros += passageirosGratuitos + passageirosPagos;
    totalCargas += cargaGratis + cargaPaga;
  });

  // Retorna os dados no formato ChartData
  return [
    {
      month: "Passageiros",
      uv: 0,
      pv: totalPassageiros,
    },
    {
      month: "Cargas",
      uv: 0,
      pv: totalCargas,
    },
  ];
}
