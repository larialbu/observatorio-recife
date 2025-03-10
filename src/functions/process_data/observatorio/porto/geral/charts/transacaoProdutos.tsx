export const processAtracacoesPorCarga = (atracacoes: any[], cargas: any[]) => {
    // Filtra as cargas que possuem uma atracação correspondente
    const cargasFiltradas = cargas.filter((carga) => 
      atracacoes.some((atracacao) => +atracacao.IDAtracacao === +carga.IDAtracacao)
    );

    // Processa os dados agrupando por CDMercadoria
    const processedData = cargasFiltradas.reduce((acc: any, carga: any) => {
      const cdMercadoria = carga.CDMercadoria || "Indefinido";
      const vlPesoCargaBruta = parseFloat(String(carga.VLPesoCargaBruta)?.replace(",", ".") || "0");
  
      if (!acc[cdMercadoria]) {
        acc[cdMercadoria] = {
          CDMercadoria: cdMercadoria, 
          totalVLPesoCargaBruta: 0,
        };
      }
  
      acc[cdMercadoria].totalVLPesoCargaBruta += vlPesoCargaBruta;
  
      return acc;
    }, {});
  
    // Retorna os valores ordenados pelo peso total da carga em ordem decrescente
    return Object.values(processedData).sort(
      (a: any, b: any) => b.totalVLPesoCargaBruta - a.totalVLPesoCargaBruta
    );
  };
  