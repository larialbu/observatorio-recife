type DataItem = {
  month: string;
  uv: number;
  pv: number;
};

export function formatMonths(data: DataItem[]): DataItem[] {
  // Mapeamento de meses
  const monthMap: { [key: string]: string } = {
    "1": "jan",
    "2": "fev",
    "3": "mar",
    "4": "abr",
    "5": "mai",
    "6": "jun",
    "7": "jul",
    "8": "ago",
    "9": "set",
    "10": "out",
    "11": "nov",
    "12": "dez",
  };

  return data.map((item) => {
    const [month, year] = item.month.split("/");
    const formattedMonth = `${monthMap[month]}`;
    // const formattedMonth = `${monthMap[month]}/${year}`;

    return {
      ...item,
      month: formattedMonth,
    };
  });
}
