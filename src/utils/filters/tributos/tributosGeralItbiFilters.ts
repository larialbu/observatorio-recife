import { monthHash } from "@/utils/hashs/monthHash";

export const tributosGeralItbiFilters = {
    id: 'tributos-geral-itbi-filters',
    years: ["2023", "2024" ], // Filtra por ano
    additionalFilters: [
      {
        label: "mes",  
        name: 'Mês',
        options: [],  
        selected: [],
        hash: monthHash
      },
      {
        label: "bairro",  
        name: 'Bairro',
        options: [],  
        selected: [],
      },
      {
        label: "tipo_imovel",  
        name: 'Imóvel',
        options: [],  
        selected: [],
      },
      {
        label: "tipo_ocupacao",  
        name: 'Ocupação',
        options: [],  
        selected: [],
      },
    ],
  };