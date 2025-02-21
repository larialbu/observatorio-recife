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
    incluirTotal: boolean = true // Parâmetro para controlar a inclusão do total - mds Rodrigo
): Record<string, ProcessedCarga> => {
    return cargas.reduce((acc, carga) => {
        const acao = carga["Ação"] || "Indefinida";
        const atracacao = atracacoes.find(a => Number(a["IDAtracacao"]) === Number(carga["IDAtracacao"])) || null;

        if (!atracacao) return acc;

        // USANDO FLOAT ????
        const pesoCarga = parseFloat(String(carga["VLPesoCargaBruta"]).replace(",", ".")) || 0;
        const quantidadeCarga = parseFloat(String(carga["QTCarga"]).replace(",", ".")) || 0;

        acc[acao] ??= { acao, totalPeso: 0, totalQuantidade: 0, cargas: [] };
        acc[acao].totalPeso += pesoCarga;
        acc[acao].totalQuantidade += quantidadeCarga;
        acc[acao].cargas.push({ ...carga, atracacao });

        if (incluirTotal) {
            acc["Total"] ??= { acao: "Total", totalPeso: 0, totalQuantidade: 0, cargas: [] };
            acc["Total"].totalPeso += pesoCarga;
            acc["Total"].totalQuantidade += quantidadeCarga;
            acc["Total"].cargas.push({ ...carga, atracacao });
        }

        // Arredonda para duas casas decimais no final
        acc[acao].totalPeso = Math.round(acc[acao].totalPeso * 100) / 100; 
        if (acc["Total"]) acc["Total"].totalPeso = Math.round(acc["Total"].totalPeso * 100) / 100; 

        return acc;
    }, {} as Record<string, ProcessedCarga>);
};

export const prepareCargasPorAcaoData = (atracacoes: any[], cargas: any[], incluirTotal: boolean = true): ProcessedCarga[] => 
    Object.values(processCargasPorAcao(atracacoes, cargas, incluirTotal));
