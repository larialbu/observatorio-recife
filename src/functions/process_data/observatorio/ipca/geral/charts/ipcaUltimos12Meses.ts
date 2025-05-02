import { IpcaGeralHeaders } from "@/@types/observatorio/@fetch/ipca";

export const processIpcaUltimos12Meses = (data: IpcaGeralHeaders[]) => {
    const recentMonth = data.reduce((acc: number, obj: IpcaGeralHeaders) => acc = acc > obj["MÊS"] ? acc : obj["MÊS"], 0)

    const dataFiltred = data.filter((obj) => obj["MÊS"] === recentMonth)
    
    const processedData = dataFiltred.reduce((acc: { [capital: string]: {capital: string, acumuladoUltimosMeses: number} }, item) => {
      const capital = item["Capital"] || "Indefinido";

      if (capital == "Brasil") {
        return acc;
      }

      const acumuladoUltimosMeses = item["IPCA - Variação acumulada em 12 meses"] || 0;
  
      if (!acc[capital]) {
        acc[capital] = { 
          capital, 
          acumuladoUltimosMeses: 0 
        };
      }
      
      if(acc[capital].capital !== "Brasil") acc[capital].acumuladoUltimosMeses += acumuladoUltimosMeses;
  
      return acc;
    }, {});
  
    return Object.values(processedData).sort(
      (a, b) => b.acumuladoUltimosMeses - a.acumuladoUltimosMeses
    );
  };
  