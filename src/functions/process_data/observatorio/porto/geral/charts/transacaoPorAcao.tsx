import { getUniqueValues, getUniqueValuesArr } from "@/utils/filters/@global/getUniqueValues";

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
  

  export const processCargasPorAcao = (
    atracacoes: any[], 
    cargas: any[], 
    incluirTotal: boolean = true // Parâmetro para controlar a inclusão do total
  ): Record<string, ProcessedCarga> =>
    {
      // console.log('UNIQUE VALUES AÇÃO', getUniqueValuesArr<any, "Ação">(
      //   cargas,
      //     "Ação"
      //   ))

        // console.log(getUniqueValuesArr)

      return cargas.reduce((acc, carga) => {
      const acao = carga["Ação"] || "Indefinida";
      const atracacao = atracacoes.find(a => a["IDAtracacao"] == carga["IDAtracacao"]) || null;
  
      // if (atracacao.IDAtracacao == 1310447) {
      //   console.log("CAHORROR AAAAIFIUGIUGHGIUHSIUGF")
      // }

      if (!atracacao) return acc; // Ignora cargas sem atracação relacionada
   
    //  console.log('ATRACACAOS LIDOS')

      // Atualiza a entrada para a ação correspondente
      // antigo
      // acc[acao] ??= { acao, totalPeso: 0, totalQuantidade: 0, cargas: [] };
      // acc[acao].totalPeso += parseInt((String(carga["VLPesoCargaBruta"]) || "0").replace(",", "."), 10);
      // acc[acao].totalQuantidade += parseInt(String(carga["QTCarga"]) || "0", 10);
      // acc[acao].cargas.push({ ...carga, atracacao });
  
      // // Adiciona os totais gerais, somente se incluirTotal for verdadeiro
      // if (incluirTotal) {
      //   acc["Total"] ??= { acao: "Total", totalPeso: 0, totalQuantidade: 0, cargas: [] };
      //   acc["Total"].totalPeso += parseInt((String(carga["VLPesoCargaBruta"]) || "0").replace(",", "."), 10);
      //   acc["Total"].totalQuantidade += parseInt(String(carga["QTCarga"]) || "0", 10);
      //   acc["Total"].cargas.push({ ...carga, atracacao });
      // }

      // novo
      // acc[acao] ??= { acao, totalPeso: 0, totalQuantidade: 0, cargas: [] };
      // acc[acao].totalPeso += Math.round(parseFloat((String(carga["VLPesoCargaBruta"]) || "0").replace(",", ".")));
      // acc[acao].totalQuantidade += parseInt(String(carga["QTCarga"]) || "0", 10);
      // acc[acao].cargas.push({ ...carga, atracacao });
      
      // // Adiciona os totais gerais, somente se incluirTotal for verdadeiro
      // if (incluirTotal) {
      //   acc["Total"] ??= { acao: "Total", totalPeso: 0, totalQuantidade: 0, cargas: [] };
      //   acc["Total"].totalPeso += Math.round(parseFloat((String(carga["VLPesoCargaBruta"]) || "0").replace(",", ".")));
      //   acc["Total"].totalQuantidade += parseInt(String(carga["QTCarga"]) || "0", 10);
      //   acc["Total"].cargas.push({ ...carga, atracacao });
      // }
      
      // Conversão e somatória do peso sem arredondamento imediato
      acc[acao] ??= { acao, totalPeso: 0, totalQuantidade: 0, cargas: [] };
      acc[acao].totalPeso += parseFloat((String(carga["VLPesoCargaBruta"]) || "0").replace(",", "."));
      acc[acao].totalQuantidade += parseInt(String(carga["QTCarga"]) || "0", 10);
      acc[acao].cargas.push({ ...carga, atracacao });

      // Adiciona os totais gerais, somente se incluirTotal for verdadeiro
      if (incluirTotal) {
        acc["Total"] ??= { acao: "Total", totalPeso: 0, totalQuantidade: 0, cargas: [] };
        acc["Total"].totalPeso += parseFloat((String(carga["VLPesoCargaBruta"]) || "0").replace(",", "."));
        acc["Total"].totalQuantidade += parseInt(String(carga["QTCarga"]) || "0", 10);
        acc["Total"].cargas.push({ ...carga, atracacao });
      }

      // Arredondar apenas no final, caso necessário
      acc[acao].totalPeso = Math.round(acc[acao].totalPeso * 100) / 100; // Arredonda para duas casas decimais, por exemplo
      acc["Total"].totalPeso = Math.round(acc["Total"].totalPeso * 100) / 100; 
  
      return acc;
    }, {} as Record<string, ProcessedCarga>)};
  
  export const prepareCargasPorAcaoData = (atracacoes: any[], cargas: any[], incluirTotal: boolean = true): ProcessedCarga[] => 
    Object.values(processCargasPorAcao(atracacoes, cargas, incluirTotal));
  




  // export interface Atracacao {
  //   IDAtracacao: string;
  //   [key: string]: any;
  // }
  
  // export interface Carga {
  //   Ação: string;
  //   IDAtracacao: string;
  //   [key: string]: any;
  // }
  
  // export interface AcaoCount {
  //   acao: string;
  //   quantidade: number;
  // }

  // export interface ProcessedCarga {
  //   acao: string;
  //   totalPeso: number;
  //   totalQuantidade: number;
  //   // cargas: (Carga & { atracacao: Atracacao | null })[];
  // }
  

  // export const processCargasPorAcao = (
  //   atracacoes: any[], 
  //   cargas: any[], 
  //   incluirTotal: boolean = true // Parâmetro para controlar a inclusão do total
  // ): Record<string, ProcessedCarga> => 
  //   cargas.reduce((acc, carga) => {
  //     const acao = carga["Ação"] || "Indefinida";
  //     // const atracacao = atracacoes.find(a => +a["IDAtracacao"] === +carga["IDAtracacao"]) || null;
  
  //     // if (!atracacao) return acc; // Ignora cargas sem atracação relacionada
  
  //     // Atualiza a entrada para a ação correspondente
  //     acc[acao] ??= { acao, totalPeso: 0, totalQuantidade: 0, cargas: [] };
  //     acc[acao].totalPeso += parseInt((String(carga["VLPesoCargaBruta"]) || "0").replace(",", "."), 10);
  //     acc[acao].totalQuantidade += parseInt(String(carga["QTCarga"]) || "0", 10);
  //     // acc[acao].cargas.push({ ...carga, atracacao });
  
  //     // Adiciona os totais gerais, somente se incluirTotal for verdadeiro
  //     if (incluirTotal) {
  //       acc["Total"] ??= { acao: "Total", totalPeso: 0, totalQuantidade: 0, cargas: [] };
  //       acc["Total"].totalPeso += parseInt((String(carga["VLPesoCargaBruta"]) || "0").replace(",", "."), 10);
  //       acc["Total"].totalQuantidade += parseInt(String(carga["QTCarga"]) || "0", 10);
  //       // acc["Total"].cargas.push({ ...carga, atracacao });
  //     }
  
  //     return acc;
  //   }, {} as Record<string, ProcessedCarga>);
  
  // export const prepareCargasPorAcaoData = (atracacoes: any[], cargas: any[], incluirTotal: boolean = true): ProcessedCarga[] => 
  //   Object.values(processCargasPorAcao(atracacoes, cargas, incluirTotal));
  