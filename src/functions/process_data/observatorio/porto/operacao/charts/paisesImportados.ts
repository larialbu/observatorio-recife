export const processCargasLongoCurso = (atracacoes: any[], cargas: any[], type: 'importacao' | 'exportacao') => {

    // Define o tipo de operação
    const tipoOperacao = type === 'importacao' ? "Importação" : "Exportação";
    // const tipoOperacao = type === 'importacao' ? "Longo Curso Importação" : "Longo Curso Exportação";
    // Define o campo de origem ou destino
    const campoOrigemDestino = type === 'importacao' ? 'Origem' : 'Destino';

    // Filtra as cargas que têm uma atracação correspondente e o tipo de operação adequado
    const cargasFiltradas = cargas.filter((carga) => 
        atracacoes.some((atracacao) => +atracacao.IDAtracacao === +carga.IDAtracacao) &&
        carga["Ação"] === tipoOperacao
        // carga["Tipo Operação da Carga"].includes(tipoOperacao)
        // carga["Tipo Operação da Carga"] === tipoOperacao
    );
  
    // Processa os dados agrupando por origem/destino e somando as quantidades e o peso bruto
    const processedData = cargasFiltradas.reduce((acc, carga) => {
        const origemDestino = carga[campoOrigemDestino] || "Indefinido"; // Agrupa pela origem ou destino
        const vlPesoCargaBruta = parseInt(String(carga.VLPesoCargaBruta)?.replace(",", ".") || "0");
    
        if (!acc[origemDestino]) {
            acc[origemDestino] = {
                totalVLPesoCargaBruta: 0
            };
        }
    
        acc[origemDestino].totalVLPesoCargaBruta += vlPesoCargaBruta;

        
        return acc;
    }, {});
  
    // Organiza os dados no formato final
    const result = Object.keys(processedData).map((origemDestino) => ({
        codigo: origemDestino,
        totalVLPesoCargaBruta: processedData[origemDestino].totalVLPesoCargaBruta
    }));
  
    return result;
};
