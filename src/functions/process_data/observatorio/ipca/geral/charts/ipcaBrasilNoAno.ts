import { IpcaGeralHeaders } from "@/@types/observatorio/@fetch/ipca";

export const processIpcaBrasilNoAno = (data: IpcaGeralHeaders[]) => {
    // Reduz os dados para calcular o acumulado por capital
    const processedData = data.reduce((acc: { [capital: string]: {capital: string, acumuladoAno: number} }, item) => {
      const capital = item["Capital"] || "Indefinido";

      if (capital !== "Brasil") {
        return acc;
      }
      const acumuladoAno = item["IPCA - Variação acumulado no ano"] || 0;
  
      if (!acc[capital]) {
        acc[capital] = { 
          capital, 
          acumuladoAno: 0 
        };
      }
      
      if(acc[capital].capital === "Brasil") acc[capital].acumuladoAno += acumuladoAno;
  
      return acc;
    }, {});
  
    // Converte o objeto em uma lista e ordena pelo acumulado no ano (descendente)
    return Object.values(processedData).sort(
      (a, b) => b.acumuladoAno - a.acumuladoAno
    );
  };
  