export const anacComparativoFilters = {
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
    ],
  };
  