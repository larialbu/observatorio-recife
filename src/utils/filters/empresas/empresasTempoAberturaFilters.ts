import { monthHash } from "@/utils/hashs/monthHash";

export const empresasTempoAberturaFilters = {
    id: 'empresas-tempo-abertura-filters',
    years: ["2023", "2024", "2025" ], // Filtra por ano
    additionalFilters: [
      {
        label: "mes",
        name: 'Mês',
        options: [],  
        selected: [],
        hash: monthHash        
      },
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