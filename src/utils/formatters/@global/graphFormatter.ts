export const tooltipFormatter = (value: any) => {
    return `${value.toLocaleString("pt-BR")} passageiros`;
};

export const yAxisFormatter = (value: any) => {
    return new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value)
}