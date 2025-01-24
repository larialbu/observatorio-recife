export const rankingPilarFilters = {
    years: ["2021", "2022", "2023", "2024"], // Filtra por ano
    additionalFilters: [
      {
        label: "Região", // O Mês será preenchido dinamicamente
        options: [], // Deixe vazio para preencher com base nos dados
        selected: []
      },
      {
        label: "UF", // O Mês será preenchido dinamicamente
        options: [], // Deixe vazio para preencher com base nos dados
        selected: []
      },
      {
        label: "Município", // O Mês será preenchido dinamicamente
        options: [], // Deixe vazio para preencher com base nos dados
        selected: ["Recife"]
      },
      {
        label: "Pilar", // O Mês será preenchido dinamicamente
        options: [], // Deixe vazio para preencher com base nos dados
        selected: ["Inovação e dinamismo econômico"],
        allowMultiple: false
      },
    ],
  };
  