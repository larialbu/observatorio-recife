import { monthHash } from "@/utils/hashs/monthHash";

export const empresasAtivasFilters = {
    years: ["2023", "2024" ], // Filtra por ano
    additionalFilters: [
      {
        label: "Grupo",  
        options: [],  
        selected: [],
      },
      {
        label: "mes",  
        options: [],  
        selected: [],
        hash: monthHash
      },
    //   {
    //     label: "Mês",  
    //     options: [],  
    //     selected: [],
    //   },
    //   {
    //     label: "município",  
    //     options: [],  
    //     selected: ["Recife-PE"],
    //   },
    //   {
    //     label: "mês",  
    //     options: [],  
    //     selected: [],
    //   },
    //   {
    //     label: "saldomovimentação",  
    //     options: [],  
    //     selected: [],
    //   },
    //   {
    //     label: "grupamento",
    //     options: ['Indústria', 'Comércio', 'Agropecuária', 'Serviços', 'Construção'],  
    //     selected: [],
    //     blocked: true,  
    //   },
    ],
  };