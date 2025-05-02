import { PortoAtracacaoHeaders, PortoCargaHeaders } from "@/@types/observatorio/@fetch/porto";

  
export interface AcaoCount {
    acao: string;
    quantidade: number;
}

export interface ProcessedCarga {
    acao: string;
    totalPeso: number;
    cargas: (PortoCargaHeaders & { atracacao: PortoAtracacaoHeaders | null })[];
}

export const processCargasPorAcao = (
    atracacoes: PortoAtracacaoHeaders[], 
    cargas: PortoCargaHeaders[], 
    incluirTotal: boolean = true // Parâmetro para controlar a inclusão do total - mds Rodrigo
): Record<string, ProcessedCarga> => {
    return cargas.reduce((acc, carga) => {
        const acao = carga["Ação"] || "Indefinida";
        const atracacao = atracacoes.find(a => Number(a["IDAtracacao"]) === Number(carga["IDAtracacao"])) || null;

        if (!atracacao) return acc;

        // USANDO FLOAT ????
        const pesoCarga = carga["VLPesoCargaBruta"] || 0;

        acc[acao] ??= { acao, totalPeso: 0, cargas: [] };
        acc[acao].totalPeso += pesoCarga;
        acc[acao].cargas.push({ ...carga, atracacao });

        if (incluirTotal) {
            acc["Total"] ??= { acao: "Total", totalPeso: 0, cargas: [] };
            acc["Total"].totalPeso += pesoCarga;
            acc["Total"].cargas.push({ ...carga, atracacao });
        }

        // Arredonda para duas casas decimais no final
        acc[acao].totalPeso = acc[acao].totalPeso  
        if (acc["Total"]) acc["Total"].totalPeso =  acc["Total"].totalPeso  

        return acc;
    }, {} as Record<string, ProcessedCarga>);
};

export const prepareCargasPorAcaoData = (atracacoes: PortoAtracacaoHeaders[], cargas: PortoCargaHeaders[], incluirTotal: boolean = true): ProcessedCarga[] => 
    Object.values(processCargasPorAcao(atracacoes, cargas, incluirTotal));
