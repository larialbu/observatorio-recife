import { monthHash } from "@/utils/hashs/monthHash";

export const empresasComparativoClasses = {
    years: ["2023", "2024", "2025" ], // Filtra por ano
    additionalFilters: [
      {
        label: "mes",  
        options: [],  
        selected: [],
        hash: monthHash        
      },
    //   {
    //     label: "Municipio",  
    //     options: [],  
    //     selected: ["Recife"],
    //   },      
      // {
      //   label: "Mês",  
      //   options: [],  
      //   selected: [],
      // },
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