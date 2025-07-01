export const monthLongName = (monthNumber: number): string => {
    const date = new Date(2000, monthNumber - 1); // mês é zero-based
    return date.toLocaleString("pt-BR", { month: "long" }).replace(".", "");
  };
  