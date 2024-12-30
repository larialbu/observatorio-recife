export const processCargasMes = (
  data: any[],
  year: string,
  airportName: string,
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

  if (months && months.length === 1) {
    const month = months[0];
    // Filtra para um único mês
    cargaMes = data.reduce((total, item) => {
      if (
        item["AEROPORTO NOME"] === airportName &&
        parseInt(item["MÊS"], 10) === month
      ) {
        const carga = parseFloat(
          (item["CARGA"] || "0").replace(/\./g, "").replace(",", ".")
        );
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
        item["AEROPORTO NOME"] === airportName &&
        mesAtual >= startMonth &&
        mesAtual <= endMonth
      ) {
        const carga = parseFloat(
          (item["CARGA"] || "0").replace(/\./g, "").replace(",", ".")
        );
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
      if (item["AEROPORTO NOME"] === airportName) {
        const carga = parseFloat(
          (item["CARGA"] || "0").replace(/\./g, "").replace(",", ".")
        );
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
