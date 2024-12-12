export const processDecolagensMes = (
    data: any[],
    year: string,
    aeroportoNome: string,
    months?: [number] | [number, number]
) => {
    if (months) {
        months.forEach((month) => {
            if (month < 1 || month > 12) {
                throw new Error("Mês inválido. O mês deve estar entre 1 e 12.");
            }
        });
    }

    let decolagensMes = 0;

    if (months && months.length === 1) {
        const month = months[0];
        // Filtra para um único mês
        decolagensMes = data.reduce((total, item) => {
            if (
                item["ANO"] === year &&
                item["AEROPORTO NOME"] === aeroportoNome &&
                parseInt(item["MÊS"], 10) === month
            ) {
                const decolagens = parseInt(item["DECOLAGENS"] || "0", 10);
                return total + decolagens;
            }
            return total;
        }, 0);

        return {
            mes: new Date(0, month - 1).toLocaleString("pt-BR", { month: "long" }),
            decolagens: decolagensMes,
        };
    } else if (months && months.length === 2) {
        const [startMonth, endMonth] = months;
        // Filtra para um intervalo de meses
        decolagensMes = data.reduce((total, item) => {
            const mesAtual = parseInt(item["MÊS"], 10);
            if (
                item["ANO"] === year &&
                item["AEROPORTO NOME"] === aeroportoNome &&
                mesAtual >= startMonth &&
                mesAtual <= endMonth
            ) {
                const decolagens = parseInt(item["DECOLAGENS"] || "0", 10);
                return total + decolagens;
            }
            return total;
        }, 0);

        return {
            intervalo: `${new Date(0, startMonth - 1).toLocaleString("pt-BR", { month: "long" })} - ${new Date(0, endMonth - 1).toLocaleString("pt-BR", { month: "long" })}`,
            decolagens: decolagensMes,
        };
    } else {
        // Filtra para o ano inteiro
        decolagensMes = data.reduce((total, item) => {
            if (
                item["ANO"] === year &&
                item["AEROPORTO NOME"] === aeroportoNome
            ) {
                const decolagens = parseInt(item["DECOLAGENS"] || "0", 10);
                return total + decolagens;
            }
            return total;
        }, 0);

        return {
            ano: year,
            decolagens: decolagensMes,
        };
    }
};
