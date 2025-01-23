export const processVariacaoPosicao = (data: any): { ano: number; [key: string]: number }[] => {
    // Extrai todos os municípios únicos de todos os anos
    const municipiosSet = new Set<string>();
    Object.keys(data).forEach((year) => {
        data[year].filteredData.forEach((item: any) => {
            municipiosSet.add(item["Município"]);
        });
    });

    // Organiza anos cronologicamente
    const sortedYears = Object.keys(data).sort();

    // Armazena rankings históricos de cada município
    const rankingHistorico: { [municipio: string]: { [ano: string]: number } } = {};

    // Primeira passagem: popula o histórico de rankings
    sortedYears.forEach((year) => {
        data[year].filteredData.forEach((item: any) => {
            const municipio = item["Município"];
            const ranking = parseInt(item["Colocação"], 10) || 0;
            
            if (!rankingHistorico[municipio]) {
                rankingHistorico[municipio] = {};
            }
            rankingHistorico[municipio][year] = ranking;
        });
    });

    // Segunda passagem: calcula variações
    const processedData: { ano: number; [key: string]: number }[] = [];

    sortedYears.forEach((year, yearIndex) => {
        const anoData: { [key: string]: number } = { ano: year } as any;

        const municipiosArray = Array.from(municipiosSet);

        // Filtra os 25 municípios com melhor ranking no primeiro ano
        if (yearIndex === 0) {
            municipiosArray.sort((a, b) => {
                const rankingA = rankingHistorico[a][year] || Infinity;
                const rankingB = rankingHistorico[b][year] || Infinity;
                return rankingA - rankingB; // ordena pelo ranking
            });

            municipiosArray.splice(25); // mantém apenas os 25 primeiros
        }

        municipiosArray.forEach((municipio) => {
            const currentRanking = rankingHistorico[municipio][year] || 0;

            if (yearIndex > 0) {
                const previousYear = sortedYears[yearIndex - 1];
                const previousRanking = rankingHistorico[municipio][previousYear] || 0;
                anoData[municipio] = previousRanking - currentRanking;
            } else {
                anoData[municipio] = currentRanking;
            }
        });

        processedData.push(anoData as any);
    });

    return processedData;
};