import { monthHash } from "@/utils/hashs/monthHash";

export const empresasInativasFilters = {
    id: 'empresas-inativas-filters',
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
        label: "nome_bairro", 
        name: 'Bairro',
        options: [],  
        selected: [],
      },
      {
        label: "Grupo", 
        name: 'Grande Grupamento de Atividade Econômica',
        options: [],  
        selected: [],
      },
      {
        label: "desc_atividade",  
        name: 'Descrição da Atividade Econômica',
        options: [],  
        selected: [],
      },
      {
        label: "situacao_empresa",  
        name: 'Situação',
        options: [],  
        selected: [],
      },
    ],
  };