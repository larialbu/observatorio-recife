import { monthHash } from "@/utils/hashs/monthHash";

export const empregosCagedFilters = {
    years: ["2023", "2024"], 
    additionalFilters: [
      {
        label: "Mês",  
        options: [],  
        selected: [],
        hash: monthHash
      },
      {
        label: "Municipio",  
        options: [],  
        selected: ['Recife-PE'],
      },
      {
        label: "Região",  
        options: [],  
        selected: [],
      },
      {
        label: "UF",  
        options: [],  
        selected: [],
      },
    ],
  };
  