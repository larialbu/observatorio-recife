import { IpcaGeralHeaders } from "@/@types/observatorio/@fetch/ipca";

export const processBrasilVariacaoMensal = (data: IpcaGeralHeaders[]) => {
    const filteredData = data.filter(
      (item) => item["Capital"] === "Brasil"
    );
  
    const meses = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  
    const processedData = meses.map((mes) => ({
      mes,
      variaçãoMensal: 0,
    }));
  
    filteredData.forEach((item) => {
      const variaçãoMensal = item["IPCA - Variação mensal"] || 0;
  
      const mes = item["MÊS"];
  
      const mesIndex = mes - 1;
  
      if (processedData[mesIndex]) {
        processedData[mesIndex].variaçãoMensal += variaçãoMensal;
      }
    });
  
    return processedData.map((item) => ({
      ...item,
      mes: new Date(0, parseInt(item.mes, 10) - 1).toLocaleString("pt-BR", {
        month: "short",
      }), // Formata para "jan", "fev", etc.
    }));
  };
  