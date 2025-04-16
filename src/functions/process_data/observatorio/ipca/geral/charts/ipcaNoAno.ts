import { IpcaGeralHeaders } from "@/@types/observatorio/@fetch/ipca";

export const processIpcaNoAno = (data: IpcaGeralHeaders[]) => {

    const processedData = data.reduce((acc: { [capital: string]: {capital: string, acumuladoAno: number}}, item: any) => {
      const capital = item["Capital"] || "Indefinido";

      if (capital == "Brasil") {
        return acc;
      }

      const acumuladoAno = parseFloat(
        (item["IPCA - Variação acumulado no ano"] || "0")
      );
  
      if (!acc[capital]) {
        acc[capital] = { 
          capital, 
          acumuladoAno: 0 
        };
      }
      
      if(acc[capital].capital !== "Brasil") acc[capital].acumuladoAno += acumuladoAno;
  
      return acc;
    }, {});
  
    return Object.values(processedData).sort(
      (a, b) => b.acumuladoAno - a.acumuladoAno
    );
  };
  