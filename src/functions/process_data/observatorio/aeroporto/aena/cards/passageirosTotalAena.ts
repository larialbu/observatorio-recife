export const processPassageirosTotalAena = (
    data: any[], 
    year: string, 
    months?: [number] | [number, number],
    aeroportoName?: string
  ) => {
    // Validação dos meses fornecidos
    if (months) {
      months.forEach((month) => {
        if (month < 1 || month > 12) {
          throw new Error("Mês inválido. O mês deve estar entre 1 e 12.");
        }
      });
    }
  
    let totalPassageiros = 0;
  
    // Filtra e soma os passageiros com base no período
    if (months && months.length === 1) {
      const month = months[0];
      // Filtra para um único mês
      totalPassageiros = data.reduce((total, item) => {
        if (
          (!aeroportoName || item["Aeroporto"] === aeroportoName) &&
          parseInt(item["Mês"], 10) === month &&
          item["Ano"].toString() === year
        ) {
          const passageiros = parseFloat(
            (item["Passageiros"] || "0").toString()
          );
          return total + passageiros;
        }
        return total;
      }, 0);
  
      return {
        mes: new Date(0, month - 1).toLocaleString("pt-BR", { month: "long" }),
        passageiros: totalPassageiros,
      };
    } else if (months && months.length === 2) {
      const [startMonth, endMonth] = months;
      // Filtra para um intervalo de meses
      totalPassageiros = data.reduce((total, item) => {
        const mesAtual = parseInt(item["Mês"], 10);
        if (
          (!aeroportoName || item["Aeroporto"] === aeroportoName) &&
          mesAtual >= startMonth &&
          mesAtual <= endMonth &&
          item["Ano"].toString() === year
        ) {
          const passageiros = parseFloat(
            (item["Passageiros"] || "0").toString()
          );
          return total + passageiros;
        }
        return total;
      }, 0);
  
      return {
        intervalo: `${new Date(0, startMonth - 1).toLocaleString("pt-BR", {
          month: "long",
        })} - ${new Date(0, endMonth - 1).toLocaleString("pt-BR", {
          month: "long",
        })}`,
        passageiros: totalPassageiros,
      };
    } else {
      // Filtra para o ano inteiro
      totalPassageiros = data.reduce((total, item) => {
        if (
          (!aeroportoName || item["Aeroporto"] === aeroportoName) &&
          item["Ano"].toString() === year
        ) {
          const passageiros = parseFloat(
            (item["Passageiros"] || "0").toString()
          );
          return total + passageiros;
        }
        return total;
      }, 0);
  
      return {
        ano: year,
        passageiros: totalPassageiros,
      };
    }
  };
  