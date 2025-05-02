import { PortoAtracacaoHeaders, PortoCargaHeaders } from "@/@types/observatorio/@fetch/porto";

export const processAtracacoesPorCarga = (atracacoes: PortoAtracacaoHeaders[], cargas: PortoCargaHeaders[]) => {
    const cargasFiltradas = cargas.filter((carga) => 
      atracacoes.some((atracacao) => +atracacao.IDAtracacao === +carga.IDAtracacao)
    );

    const processedData = cargasFiltradas.reduce((acc: { [cdMercadoria: string]: {CDMercadoria: string, totalVLPesoCargaBruta: number} }, carga) => {
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
  
    return Object.values(processedData).sort(
      (a, b) => b.totalVLPesoCargaBruta - a.totalVLPesoCargaBruta
    );
  };
  