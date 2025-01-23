export const rowsCapitalsIndice = (
  data: any[],
  year: string,
  capital: string,
  month?: number
) => {
  const filteredData = data.filter(
    (item) =>
      item["ANO"] === year &&
      (!month || +item["MÊS"] === month) &&
      item["Capital"] === capital
  );

  const aggregatedData = filteredData.reduce((acc: any, item: any) => {
    const grupo = item["Grupo"];
    const mensal = parseFloat(item["Mensal"].replace(",", ".")) || 0;
    const acumulado = parseFloat(item["Acumulado"].replace(",", ".")) || 0;
    const peso = parseFloat(item["Peso"].replace(",", ".")) || 0;

    if (!acc[grupo]) {
      acc[grupo] = {
        GRUPO: grupo,
        VARIAÇÃO_MENSAL: 0,
        VARIAÇÃO_ACUMULADA: 0,
        PESO_TOTAL: 0,
      };
    }

    acc[grupo].VARIAÇÃO_MENSAL += mensal;
    acc[grupo].VARIAÇÃO_ACUMULADA += acumulado;
    acc[grupo].PESO_TOTAL += peso;

    return acc;
  }, {});

  const totalPesoGeral: any = Object.values(aggregatedData).reduce(
    (total, item: any) => total + item.PESO_TOTAL,
    0
  );

  return Object.values(aggregatedData).map((item: any) => ({
    GRUPO: item.GRUPO,
    VARIAÇÃO_MENSAL: item.PESO_TOTAL ? item.VARIAÇÃO_MENSAL.toFixed(2) : 0,
    VARIAÇÃO_ACUMULADA: item.PESO_TOTAL
      ? item.VARIAÇÃO_ACUMULADA.toFixed(2)
      : 0,
    PESO_MENSAL: totalPesoGeral ? item.PESO_TOTAL.toFixed(2) : 0,
  }));
};
