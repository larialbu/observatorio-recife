export const rankingGeralFilters = {
    years: ["2021", "2022", "2023", "2024"], // Filtra por ano
    additionalFilters: [
      {
        label: "MÊS", // O Mês será preenchido dinamicamente
        options: [], // Deixe vazio para preencher com base nos dados
        selected: []
      },
      {
        label: "Região",
        options: [], // Deixe vazio para preencher com base nos dados
        selected: []
      },
      {
        label: "Estado",
        options: [], // Deixe vazio para preencher com base nos dados
        selected: []
      },
      {
        label: "Município",
        options: [], // Deixe vazio para preencher com base nos dados
        selected: ["Recife"]
      },
    ],
  };
  