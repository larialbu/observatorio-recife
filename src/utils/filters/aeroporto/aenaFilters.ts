import { monthHash } from "@/utils/hashs/monthHash";

export const aenaFilters = {
    years: ["2021", "2022", "2023", "2024"], // Filtra por ano
    additionalFilters: [
      {
        label: "Mês", // O Mês será preenchido dinamicamente
        options: [], // Deixe vazio para preencher com base nos dados
        selected: [],
        hash: monthHash
      },
      {
        label: "Aeroporto", // Nome dos aeroportos será preenchido dinamicamente
        options: [], // Deixe vazio para preencher com base nos dados
        selected: ["Recife"],
      },
    ],
  };
  