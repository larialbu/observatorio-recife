import { IpcaGeralHeaders } from "@/@types/observatorio/@fetch/ipca";

export const processIpcaBrasilUltimos12Meses = (data: IpcaGeralHeaders[]) => {

    const processedData = data.reduce((acc: { [capital: string]: {capital: string, acumuladoUltimosMeses: number} }, item) => {
      const capital = item["Capital"] || "Indefinido";

      if (capital !== "Brasil") {
        return acc;
      }
      const acumuladoUltimosMeses = item["IPCA - Variação acumulada em 12 meses"] || 0;
  
      if (!acc[capital]) {
        acc[capital] = { 
          capital, 
          acumuladoUltimosMeses: 0 
        };
      }
      
      if(acc[capital].capital === "Brasil") acc[capital].acumuladoUltimosMeses += acumuladoUltimosMeses;
  
      return acc;
    }, {});
  
    return Object.values(processedData).sort(
      (a, b) => b.acumuladoUltimosMeses - a.acumuladoUltimosMeses
    );
  };
  