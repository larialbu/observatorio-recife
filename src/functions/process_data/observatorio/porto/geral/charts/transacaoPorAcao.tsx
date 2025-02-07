// export interface Atracacao {
//     IDAtracacao: string;
//     [key: string]: any;
//   }
  
//   export interface Carga {
//     Ação: string;
//     IDAtracacao: string;
//     VLPesoCargaBruta: string;
//     QTCarga: string;
//     [key: string]: any;
//   }
  
export interface Atracacao {
    IDAtracacao: string;
    [key: string]: any;
  }
  
  export interface Carga {
    Ação: string;
    IDAtracacao: string;
    [key: string]: any;
  }
  
  export interface AcaoCount {
    acao: string;
    quantidade: number;
  }

  export interface ProcessedCarga {
    acao: string;
    totalPeso: number;
    totalQuantidade: number;
    cargas: (Carga & { atracacao: Atracacao | null })[];
  }
  
  export const processCargasPorAcao = (atracacoes: any[], cargas: any[]): Record<string, ProcessedCarga> => 
    cargas.reduce((acc, carga) => {
      const acao = carga["Ação"] || "Indefinida";
      const atracacao = atracacoes.find(a => +a["IDAtracacao"] === +carga["IDAtracacao"]) || null;
  
      if (!atracacao) return acc; // Ignora cargas sem atracação relacionada
  
      acc[acao] ??= { acao, totalPeso: 0, totalQuantidade: 0, cargas: [] };
      acc[acao].totalPeso += parseInt((String(carga["VLPesoCargaBruta"]) || "0").replace(",", "."));
      acc[acao].totalQuantidade += parseInt(String(carga["QTCarga"]) || "0", 10);
      acc[acao].cargas.push({ ...carga, atracacao });
  
      return acc;
    }, {} as Record<string, ProcessedCarga>);
  
  export const prepareCargasPorAcaoData = (atracacoes: any[], cargas: any[]): ProcessedCarga[] => 
    Object.values(processCargasPorAcao(atracacoes, cargas));
  



  