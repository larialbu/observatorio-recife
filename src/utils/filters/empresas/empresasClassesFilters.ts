import { monthHash } from "@/utils/hashs/monthHash";

export const empresasClassesFilters = {
    id: 'empresas-classes-filters',
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
        label: "Municipio", 
        name: 'Capital do NE', 
        options: [],  
        selected: [],
      },      
      {
        label: "Grupo", 
        name: 'Grupamento',
        options: [],  
        selected: [],
      },
      {
        label: "nome_secao",
        name: 'Seção',  
        options: [],  
        selected: [],
      },
      {
        label: "Subclasse",  
        name: 'CNAE',
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