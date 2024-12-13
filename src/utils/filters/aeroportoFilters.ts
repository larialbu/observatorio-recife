export const aeroportosFilters = {
  years: ["2023", "2024"], // Filtra por ano
  additionalFilters: [
    {
      label: "NATUREZA", // Deve corresponder exatamente à chave nos dados
      options: ["Doméstica", "Internacional"], // Opções alinhadas aos valores da chave
      selected: [],
    },
    {
      label: "AEROPORTO REGIÃO", // Alterado para corresponder ao objeto de saída
      options: ["Norte", "Nordeste", "Sul", "Sudeste", "Centro-Oeste"], // Opções válidas, automatizar para não serem inseridas à mão
      selected: [],
    },
    {
      label: "AEROPORTO NOME",
      options: ["RECIFE", "FORTALEZA"], // Opções válidas, automatizar para não serem inseridas à mão
      selected: [],
    }
  ],
};
