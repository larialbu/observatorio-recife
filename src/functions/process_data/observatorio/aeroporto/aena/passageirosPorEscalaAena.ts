export const processPassageirosPorEscala = (data: any[]) => {
    // Reduz os dados por tipo de escala
    return data.reduce((acc: any, item: any) => {
      const escala = item["Escala"] || "Indefinida";
      
      const passageiros = parseFloat(
        (item["Passageiros"] || "0").toString().replace(/\./g, "").replace(",", ".")
      );
  
      if (!acc[escala]) {
        acc[escala] = { escala, total: 0 };
      }
  
      acc[escala].total += passageiros;
  
      return acc;
    }, {});
  };
  
  export const preparePassageirosPorEscalaData = (data: any[]) => {
    const processed = processPassageirosPorEscala(data);
    
    // Retorna um array no formato desejado
    return Object.values(processed).map((item: any) => ({
      escala: item.escala,
      total: item.total
    }));
  };
  