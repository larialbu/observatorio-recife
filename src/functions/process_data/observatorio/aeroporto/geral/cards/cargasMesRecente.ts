export const processCargasMes = (
  data: any[],
  year: string,
  airportName?: string,
  months?: [number] | [number, number]
) => {
  if (months) {
    months.forEach((month) => {
      if (month < 1 || month > 12) {
        throw new Error("Mês inválido. O mês deve estar entre 1 e 12.");
      }
    });
  }

  let cargaMes = 0;

  const parseCarga = (carga: any): number => {
    const parsed = parseFloat(
      (carga || "0")
    );
    return isNaN(parsed) ? 0 : parsed;
  };

  if (months && months.length === 1) {
    const month = months[0];
    // Filtra para um único mês
    cargaMes = data.reduce((total, item) => {
      if (
        (!airportName || item["AEROPORTO NOME"] === airportName) &&
        parseInt(item["MÊS"], 10) === month
      ) {
        const carga = parseCarga(item["CARGA"]);
        return total + carga;
      }
      return total;
    }, 0);

    return {
      mes: new Date(0, month - 1).toLocaleString("pt-BR", { month: "long" }),
      carga: cargaMes,
    };
  } else if (months && months.length === 2) {
    const [startMonth, endMonth] = months;
    // Filtra para um intervalo de meses
    cargaMes = data.reduce((total, item) => {
      const mesAtual = parseInt(item["MÊS"], 10);
      if (
        (!airportName || item["AEROPORTO NOME"] === airportName) &&
        mesAtual >= startMonth &&
        mesAtual <= endMonth
      ) {
        const carga = parseCarga(item["CARGA"]);
        return total + carga;
      }
      return total;
    }, 0);

    return {
      intervalo: `${new Date(0, startMonth - 1).toLocaleString("pt-BR", {
        month: "long",
      })} - ${new Date(0, endMonth - 1).toLocaleString("pt-BR", {
        month: "long",
      })}`,
      carga: cargaMes,
    };
  } else {
    // Filtra para o ano inteiro
    cargaMes = data.reduce((total, item) => {
      if (!airportName || item["AEROPORTO NOME"] === airportName) {
        const carga = parseCarga(item["CARGA"]);
        return total + carga;
      }
      return total;
    }, 0);

    return {
      ano: year,
      carga: cargaMes,
    };
  }
};
