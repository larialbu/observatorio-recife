import { monthHash } from "@/utils/hashs/monthHash";

export const empresasGeralFilters = {
    id: 'empresas-geral-filters',
    years: ["2023", "2024" ], // Filtra por ano
    additionalFilters: [
      {
        label: "mes",  
        name: 'Mês',
        options: [],  
        selected: [],
        hash: monthHash,
      },
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