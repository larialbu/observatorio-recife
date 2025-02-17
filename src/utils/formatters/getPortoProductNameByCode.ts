export function getPortoProductNameByCode(mercadoriaArray: any[], mercadoriaDictionary: any[]) {
    const resultMap = new Map<string, any>(); // Usamos um Map para agrupar por CDMercadoria
  
    mercadoriaArray.forEach((mercadoriaItem: any) => {
      // Encontrar o item correspondente no dicionário pelo CDMercadoria
      const mercadoriaDictionaryFind = mercadoriaDictionary.find((dictionary: any) => dictionary.CDMercadoria === mercadoriaItem.CDMercadoria);
      
      // Obter a nomenclatura ou o nome da mercadoria
      const nomenclatura = mercadoriaDictionaryFind?.['Nomenclatura Simplificada Mercadoria'] || mercadoriaDictionaryFind?.Mercadoria;
      
      // Se o CDMercadoria já existe no Map, somamos os valores, caso contrário, adicionamos um novo item
      if (resultMap.has(nomenclatura)) {
        const existing = resultMap.get(nomenclatura);
        existing.totalQTCarga += mercadoriaItem.totalQTCarga;
        existing.totalVLPesoCargaBruta += mercadoriaItem.totalVLPesoCargaBruta;
      } else {
        resultMap.set(nomenclatura, {
          CDMercadoria: nomenclatura,
          totalQTCarga: mercadoriaItem.totalQTCarga,
          totalVLPesoCargaBruta: mercadoriaItem.totalVLPesoCargaBruta
        });
      }
    });
  
    // Convertendo o Map de volta para um array e ordenando pelo totalVLPesoCargaBruta de forma decrescente
    return Array.from(resultMap.values())
      .sort((a, b) => b.totalVLPesoCargaBruta - a.totalVLPesoCargaBruta); // Ordenação decrescente
  }
  