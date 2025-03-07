export const anacFilters = {
  years: ["2021", "2022", "2023", "2024"], // Filtra por ano
  additionalFilters: [
    {
      label: "NATUREZA", // Deve corresponder exatamente à chave nos dados
      options: ["Doméstica", "Internacional"], // Já definido manualmente
      selected: [],
      static: true
    },
    {
      label: "MÊS", // O Mês será preenchido dinamicamente
      options: [], // Deixe vazio para preencher com base nos dados
      selected: [],
      static: true
    },
    {
      label: "AEROPORTO REGIÃO", // Região será preenchida dinamicamente
      options: [], // Deixe vazio para preencher com base nos dados
      selected: [],
      static: false
    },
    {
      label: "AEROPORTO UF",
      options: [],
      selected: [],
      static: false
    },
    {
      label: "AEROPORTO NOME", // Nome dos aeroportos será preenchido dinamicamente
      options: [], // Deixe vazio para preencher com base nos dados
      selected: ['Recife'],
      static: true
    },
  ],
};
