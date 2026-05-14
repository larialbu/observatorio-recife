import { Filters } from "@/@types/observatorio/shared";

const anos = [
  "Todos",
  "2026",
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
];

const meses = [
  "Todos",
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const produtos = [
  "Todos",
  "Gasolina Comum",
  "Gasolina Aditivada",
  "Etanol Hidratado",
  "Gnv",
  "Oleo Diesel",
  "Oleo Diesel S10",
  "Glp",
];

const estados = [
  "Todos",
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

export const combustiveisFilters: Filters = {
  years: anos,

  additionalFilters: [
    {
      label: "Mês",
      options: meses,
      selected: ["Todos"],
      allowMultiple: false,
    },
    {
      label: "PRODUTO",
      options: produtos,
      selected: ["Gasolina Comum"],
      allowMultiple: false,
    },
    {
      label: "ESTADO",
      options: estados,
      selected: ["Todos"],
      allowMultiple: false,
    },
    {
      label: "MUNICÍPIO",
      options: ["Todos"],
      selected: ["Todos"],
      allowMultiple: false,
    },
  ],
};

export const combustiveisGeralFilters = combustiveisFilters;
export const combustiveisComparativoFilters = combustiveisFilters;
export const combustiveisRegionalFilters = combustiveisFilters;
export const combustiveisEstadualFilters = combustiveisFilters;
export const combustiveisMunicipalFilters = combustiveisFilters;
