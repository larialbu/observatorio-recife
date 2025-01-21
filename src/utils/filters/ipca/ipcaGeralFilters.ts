export const ipcaGeralFilters = {
    years: ["2023", "2024"], // Filtra por ano
    additionalFilters: [
      {
        label: "MÊS", // O Mês será preenchido dinamicamente
        options: [], // Deixe vazio para preencher com base nos dados
        selected: []
      },
      {
        label: "Capital",
        options: [],
        selected: ["Recife"],
        fixed: ["Brasil"]
      }
    ],
  };
  