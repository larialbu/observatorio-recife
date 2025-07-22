export const microCagedComparativoFilters = {
    id: 'micro-caged-comparativo-filters',
    years: ["2023", "2024", "2025"], // Filtra por ano
    additionalFilters: [
      {
        label: "mês",  
        options: [],  
        selected: [],
      },
      {
        label: "saldomovimentação",  
        options: [],  
        selected: [],
      },
      {
        label: "grupamento",
        options: ['Indústria', 'Comércio', 'Agropecuária', 'Serviços', 'Construção'],  
        selected: [],
        blocked: true,  
      },
    ],
  };