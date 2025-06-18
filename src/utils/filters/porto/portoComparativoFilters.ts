import { monthHash } from "@/utils/hashs/monthHash";

export const portoComparativoFilters = {
    years: ["2023", "2024"], // Filtra por ano
    additionalFilters: [
      {
        label: "Mes", // O Mês será preenchido dinamicamente
        options: [], // Deixe vazio para preencher com base nos dados
        selected: [],
        hash: monthHash
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
        label: "Ação", // O Mês será preenchido dinamicamente
        options: [], // Deixe vazio para preencher com base nos dados
        selected: []
      },
    ],
  };
  