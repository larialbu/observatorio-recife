// pibGeralFilters.ts

// Define a interface para os filtros do PIB
export interface PibFilter {
  years: string[]; // Anos disponíveis para filtragem
  additionalFilters?: Array<{
    label: string; // Nome do filtro (ex.: "Região", "Município")
    options: string[]; // Opções disponíveis para o filtro
    selected: string[]; // Itens selecionados no filtro
  }>;
}

// Exporta os filtros padrão para o PIB
export const pibGeralFilters: PibFilter = {
  years: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"], // Todos os anos disponíveis
  additionalFilters: [
    {
      label: "Região",
      options: ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"],
      selected: [], // Nenhuma região selecionada por padrão
    },
    {
      label: "Estado",
      options: [],
      selected: [], // Nenhum estado selecionado por padrão
    },
    {
      label: "Município",
      options: [],
      selected: ["Recife-PE"], // Município padrão selecionado
    },
  ],
};