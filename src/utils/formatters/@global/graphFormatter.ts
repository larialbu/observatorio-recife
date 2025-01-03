export const tooltipFormatter = (value: any, suffix: string = "", prefix: string = "") => {
    return `${prefix}${value.toLocaleString("pt-BR")}${suffix}`;
  };
  
  export const yAxisFormatter = (value: any) => {
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  