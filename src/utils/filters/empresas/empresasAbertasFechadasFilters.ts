import { monthHash } from "@/utils/hashs/monthHash";

export const empresasAbertasFechadasFilters = {
    id: 'empresas-abertas-fechadas-filters',
    years: ["2023", "2024", "2025" ], // Filtra por ano
    additionalFilters: [
      {
        label: "mes",  
        name: 'Mês',
        options: [],  
        selected: [],
        hash: monthHash        
      },
      {
        label: "UF",
        name: 'Estado',  
        options: [],  
        selected: [],
      },
      {
        label: "Município",
        name: 'Município',  
        options: [],  
        selected: [],
      },
      {
        label: "Natureza Jurídica",
        name: 'Tipo Empreendimento',
        options: [],  
        selected: [],
      },
      {
        label: "Porte",
        name: 'Porte Empresa',
        options: [],  
        selected: [],
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