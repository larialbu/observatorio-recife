import { monthHash } from "@/utils/hashs/monthHash";

export const anacFilters = {
  years: ["2021", "2022", "2023", "2024"], // Filtra por ano
  additionalFilters: [
    {
      label: "NATUREZA", // Deve corresponder exatamente à chave nos dados
      options: ["Doméstica", "Internacional"], // Já definido manualmente
      selected: [],
    },
    {
      label: "MÊS", // O Mês será preenchido dinamicamente
      options: [], // Deixe vazio para preencher com base nos dados
      selected: [],
      hash: monthHash
    },
    {
      label: "AEROPORTO REGIÃO", // Região será preenchida dinamicamente
      options: [], // Deixe vazio para preencher com base nos dados
      selected: [],
    },
    {
      label: "AEROPORTO UF",
      options: [],
      selected: [],
    },
    {
      label: "AEROPORTO NOME", // Nome dos aeroportos será preenchido dinamicamente
      options: [], // Deixe vazio para preencher com base nos dados
      selected: ['Recife'],
    },
  ],
};
