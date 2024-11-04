interface DadosEconomicos {
  Ano: string;
  "Nome da Grande Região": string;
  "Nome do Município": string;
  "Produto Interno Bruto per capita, ↵a preços correntes↵(R$ 1,00)": string;
  "Amazônia Legal": string;
  "Atividade com maior valor adicionado bruto": string;
  "Atividade com segundo maior valor adicionado bruto": string;
  "Atividade com terceiro maior valor adicionado bruto": string;
  "Cidade-Região de São Paulo": string;
  "Código Arranjo Populacional": string;
  "Código Concentração Urbana": string;
  "Código da Grande Região": string;
  "Código da Mesorregião": string;
  "Código da Microrregião": string;
  "Código da Região Geográfica Imediata": string;
  "Código da Região Geográfica Intermediária": string;
  "Código da Região Rural": string;
  "Código da Unidade da Federação": string;
  "Código do Município": string;
  "Hierarquia Urbana": string;
  "Hierarquia Urbana (principais categorias)": string;
  "Município da Região Geográfica Imediata": string;
  "Município da Região Geográfica Intermediária": string;
  "Nome Arranjo Populacional": string;
  "Nome Concentração Urbana": string;
  "Nome da Mesorregião": string;
  "Nome da Microrregião": string;
  "Nome da Região Geográfica Imediata": string;
  "Nome da Região Geográfica Intermediária": string;
  "Nome da Região Rural": string;
  "Nome da Unidade da Federação": string;
  "Principais Capitais": string;
  "Região Metropolitana": string;
  "Região rural (segundo classificação do núcleo)": string;
  Semiárido: string;
  "Sigla da Unidade da Federação": string;
  "Tipo Concentração Urbana": string;
  "Valor adicionado bruto da Administração, defesa_1, educação e saúde públicas e seguridade social, ↵a preços correntes↵(R$ 1.000)": string;
  "Valor adicionado bruto da Agropecuária, ↵a preços correntes↵(R$ 1.000)": string;
  "Valor adicionado bruto da Indústria,↵a preços correntes↵(R$ 1.000)": string;
  "Valor adicionado bruto dos Serviços,↵a preços correntes ↵- exceto Administração, defesa, educação e saúde públicas e seguridade social↵(R$ 1.000)": string;
  __parsed_extra: string[];
}

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
  jsonData: DadosEconomicos[],
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
