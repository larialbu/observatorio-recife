import { AenaPassageirosHeaders } from "@/@types/observatorio/@fetch/aeroporto";

export const processPassageirosPorEscala = (
    data: AenaPassageirosHeaders[]
  ) => {
    // reduz os dados por tipo de escala
    return data.reduce((acc: { [escala: string]: { escala: string; total: number } }, item: AenaPassageirosHeaders) => {
      const escala = item["Escala"] || "Indefinida";
      
      const passageiros = item["Passageiros"] || 0;
  
      if (!acc[escala]) {
        acc[escala] = { escala, total: 0 };
      }
  
      acc[escala].total += passageiros;
  
      return acc;
    }, {});
  };
  
  export const preparePassageirosPorEscalaData = (data: AenaPassageirosHeaders[]) => {
    const processed = processPassageirosPorEscala(data);
    
    // Retorna um array no formato desejado
    return Object.values(processed).map((item: any) => ({
      escala: item.escala,
      total: item.total
    }));
  };
  