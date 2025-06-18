import { monthHash } from "@/utils/hashs/monthHash";

export const ipcaGeralFilters = {
    years: ["2023", "2024"], // Filtra por ano
    additionalFilters: [
      {
        label: "MÊS", // O Mês será preenchido dinamicamente
        options: [], // Deixe vazio para preencher com base nos dados
        selected: [],
        hash: monthHash
      },
      {
        label: "Capital",
        options: [],
        selected: ["Recife"],
        fixed: ["Brasil"]
      }
    ],
  };
  