import { PortoAtracacaoHeaders, PortoCargaHeaders } from "@/@types/observatorio/@fetch/porto";

export const processCargasLongoCurso = (atracacoes: PortoAtracacaoHeaders[], cargas: PortoCargaHeaders[], type: 'importacao' | 'exportacao') => {
    const tipoOperacao = type === 'importacao' ? "Importação" : "Exportação";

    const campoOrigemDestino = type === 'importacao' ? 'Origem' : 'Destino';

    const cargasFiltradas = cargas.filter((carga) => 
        atracacoes.some((atracacao) => +atracacao.IDAtracacao === +carga.IDAtracacao) &&
        carga["Ação"] === tipoOperacao
    );
  
    const processedData = cargasFiltradas.reduce((acc: { [origemDestino: string]: {totalVLPesoCargaBruta: number} }, carga) => {
        const origemDestino = carga[campoOrigemDestino] || "Indefinido";
        const vlPesoCargaBruta =  carga.VLPesoCargaBruta  ||  0 
    
        if (!acc[origemDestino]) {
            acc[origemDestino] = {
                totalVLPesoCargaBruta: 0
            };
        }
    
        acc[origemDestino].totalVLPesoCargaBruta += vlPesoCargaBruta;

        
        return acc;
    }, {});

    const result = Object.keys(processedData).map((origemDestino) => ({
        codigo: origemDestino,
        totalVLPesoCargaBruta: processedData[origemDestino].totalVLPesoCargaBruta
    }));
  
    return result;
};
