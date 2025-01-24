export const rankingDimensaoFilters = {
  years: ["2021", "2022", "2023", "2024"], // Filtra por ano
  additionalFilters: [
    {
      label: "Região",
      options: [], // Deixe vazio para preencher com base nos dados
      selected: [],
    },
    {
      label: "Estado",
      options: [], // Deixe vazio para preencher com base nos dados
      selected: [],
    },
    {
      label: "Município",
      options: [], // Deixe vazio para preencher com base nos dados
      selected: ["Recife"],
    },
    {
      label: "Dimensão",
      options: [], // Deixe vazio para preencher com base nos dados
      selected: ["Instituições"],
    },
  ],
};
