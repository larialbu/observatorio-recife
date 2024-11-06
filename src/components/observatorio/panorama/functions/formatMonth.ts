type DataItem = {
  month: string;
  uv: number;
  pv: number;
};

export function formatMonth1(data: DataItem[]): DataItem[] {
  const monthNames: { [key: string]: string } = {
    "Mês 1": "Janeiro",
    "Mês 2": "Fevereiro",
    "Mês 3": "Março",
    "Mês 4": "Abril",
    "Mês 5": "Maio",
    "Mês 6": "Junho",
    "Mês 7": "Julho",
    "Mês 8": "Agosto",
    "Mês 9": "Setembro",
    "Mês 10": "Outubro",
    "Mês 11": "Novembro",
    "Mês 12": "Dezembro",
  };

  return data.map((item) => ({
    ...item,
    month: monthNames[item.month] || item.month,
  }));
}

export function formatMonth2(data: DataItem[]): DataItem[] {
  return data.map((item) => {
    // Extrai apenas o mês (primeira palavra) do campo `month`
    const [month] = item.month.split(" ");
    return {
      ...item,
      month, // Mantém apenas o mês sem o ano
    };
  });
}
