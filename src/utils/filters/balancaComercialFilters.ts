export const balancaComercialFilters = {
  years: ["2023", "2024"], // Filtra por ano
  additionalFilters: [
    {
      label: "Mês", // O Mês será preenchido dinamicamente
      options: [], // Deixe vazio para preencher com base nos dados
      selected: []
    },
    {
      label: "Município", // Município será preenchido dinamicamente
      options: [], // Deixe vazio para preencher com base nos dados
      selected: [],
    },
    {
      label: "UF do Município", // UF será preenchido dinamicamente
      options: [], 
      selected: []
    },
    {
      label: "País", // País será preenchido dinamicamente
      options: [], // Deixe vazio para preencher com base nos dados
      selected: [],
    },
    {
      label: "Continente", // Continente será preenchido dinamicamente
      options: [],
      selected: [],
    },
    {
      label: "Tipo", // Tipo será preenchido dinamicamente (Importação/Exportação)
      options: ["Importação", "Exportação"],
      selected: [],
    },
  ],
};
