export const processIpcaNoAno = (data: any[]) => {
    // Reduz os dados para calcular o acumulado por capital
    const processedData = data.reduce((acc: any, item: any) => {
      const capital = item["Capital"] || "Indefinido";

      if (capital == "Brasil") {
        return acc;
      }

      const acumuladoAno = parseFloat(
        (item["variação acumulada no ano"] || "0").replace(",", ".")
      ); // Converte o acumulado para número
  
      if (!acc[capital]) {
        acc[capital] = { capital, acumuladoAno: 0 };
      }
      
      if(acc[capital].capital !== "Brasil") acc[capital].acumuladoAno += acumuladoAno;
  
      return acc;
    }, {});
  
    // Converte o objeto em uma lista e ordena pelo acumulado no ano (descendente)
    return Object.values(processedData).sort(
      (a: any, b: any) => b.acumuladoAno - a.acumuladoAno
    );
  };
  