export const balancaComercialAnaliticoFilters = {
    years: ["2021", "2022", "2023", "2024", "2025"], // Filtra por ano
    additionalFilters: [
      {
        label: "Mês", // O Mês será preenchido dinamicamente
        options: [], // Deixe vazio para preencher com base nos dados
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
    ],
  };
  