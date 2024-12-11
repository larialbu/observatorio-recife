export const processCargasMesRecente = (
  data: any[],
  year: string,
  aeroportoNome: string
) => {
  // Encontra o último mês no qual há registros
  const ultimoMes = data.reduce((maxMes, item) => {
    if (item["ANO"] === year && item["AEROPORTO NOME"] === aeroportoNome) {
      const mes = parseInt(item["MÊS"], 10);
      return mes > maxMes ? mes : maxMes;
    }
    return maxMes;
  }, 0);

  if (ultimoMes === 0) return { mes: "N/A", carga: 0 }; // Retorna "N/A" se não houver dados

  // Filtra os dados para o último mês
  const cargaUltimoMes = data.reduce((total, item) => {
    if (
      item["ANO"] === year &&
      item["AEROPORTO NOME"] === aeroportoNome &&
      parseInt(item["MÊS"], 10) === ultimoMes
    ) {
      const carga = parseFloat(
        (item["CARGA"] || "0").replace(/\./g, "").replace(",", ".")
      );
      return total + carga;
    }
    return total;
  }, 0);

  return {
    mes: new Date(0, ultimoMes - 1).toLocaleString("pt-BR", { month: "long" }),
    carga: cargaUltimoMes,
  };
};
