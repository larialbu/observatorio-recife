export interface BalancaHeaders {
    Ano: number;
    Mês: string;
    Data: string;
    Município: string;
    "UF do Município": string;
    País: string;
    Continente: string;
    "Codigo SH4": number;
    "Descrição SH4": string;
    "Valor US$": number;
    tipo: "Exportação" | "Importação";
  }
  