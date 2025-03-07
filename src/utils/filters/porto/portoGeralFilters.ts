export const portoGeralFilters = {
    years: ["2023", "2024"], // Filtra por ano
    additionalFilters: [
      {
        label: "Mes", // O Mês será preenchido dinamicamente
        options: [], // Deixe vazio para preencher com base nos dados
        selected: []
      },
      {
        label: "Município", // O Mês será preenchido dinamicamente
        options: [], // Deixe vazio para preencher com base nos dados
        selected: []
      },
      {
        label: "SGUF", // O Mês será preenchido dinamicamente
        options: [], // Deixe vazio para preencher com base nos dados
        selected: []
      },
      {
        label: "Porto Atracação",
        options: [], // Deixe vazio para preencher com base nos dados
        selected: ['Recife'],
        allowMultiple: false
      },
      // { 
      //   label: "CDTUP",
      //   options: [], // Deixe vazio para preencher com base nos dados
      //   selected: ['Brrec'],
      //   allowMultiple: false
      // },
      { 
        label: "Ação", // O Mês será preenchido dinamicamente
        options: [], // Deixe vazio para preencher com base nos dados
        selected: []
      },
    ],
  };
  