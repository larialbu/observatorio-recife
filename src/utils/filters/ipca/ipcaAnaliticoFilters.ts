import { monthHash } from "@/utils/hashs/monthHash";

export const ipcaAnaliticoFilters = {
  years: ["2023", "2024"], // Filtra por ano
  additionalFilters: [
    {
      label: "MÊS", // O Mês será preenchido dinamicamente
      options: [], // Deixe vazio para preencher com base nos dados
      selected: [],
      allowMultiple: false,
      hash: monthHash
    },
    {
      label: "Grupo", // O Mês será preenchido dinamicamente
      options: [], // Deixe vazio para preencher com base nos dados
      selected: [],
    },
    // {
    //   label: "Capital", // O Mês será preenchido dinamicamente
    //   options: [], // Deixe vazio para preencher com base nos dados
    //   selected: ['Recife']
    // },
  ],
};
