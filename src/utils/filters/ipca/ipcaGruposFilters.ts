import { monthHash } from "@/utils/hashs/monthHash";

export const ipcaGruposFilters = {
    years: ["2023", "2024"], // Filtra por ano
    additionalFilters: [
      {
        label: "MÊS", // O Mês será preenchido dinamicamente
        options: [], // Deixe vazio para preencher com base nos dados
        selected: [],
        hash: monthHash
      },
      {
        label: "Capital", // O Mês será preenchido dinamicamente
        options: [], // Deixe vazio para preencher com base nos dados
        selected: ['Recife']
      },
      {
        label: "Grupo", // O Mês será preenchido dinamicamente
        options: [], // Deixe vazio para preencher com base nos dados
        selected: []
      },
      {
        label: "Subgrupo", // O Mês será preenchido dinamicamente
        options: [], // Deixe vazio para preencher com base nos dados
        selected: []
      },
      {
        label: "Item", // O Mês será preenchido dinamicamente
        options: [], // Deixe vazio para preencher com base nos dados
        selected: []
      },
      {
        label: "SubItem", // O Mês será preenchido dinamicamente
        options: [], // Deixe vazio para preencher com base nos dados
        selected: []
      },
    ],
  };
  