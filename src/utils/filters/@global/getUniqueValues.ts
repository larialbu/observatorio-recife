export const getUniqueValues = <T, K extends keyof T>(data: T[], key: K): T[K][] => {
    const uniqueValues: T[K][] = []

    data.map((value) => {
        if (uniqueValues.includes(value[key])) {
            return
        }

        uniqueValues.push(value[key])
    })

    return uniqueValues
}


export const getUniqueValuesArr = <T, K extends keyof T>(data: T[], key: K): { [key: string]: T[] }[] => {
    // Cria um objeto para armazenar os valores agrupados por chave
    const uniqueValuesMap: { [key: string]: T[] } = {};

    // Itera sobre os dados
    data.forEach((value) => {
        const keyValue = String(value[key]);  // Converte o valor da chave para string

        // Se a chave ainda não foi adicionada, inicializa o array
        if (!uniqueValuesMap[keyValue]) {
            uniqueValuesMap[keyValue] = [];
        }

        // Adiciona o item ao array correspondente à chave
        uniqueValuesMap[keyValue].push(value);
    });

    // Retorna um array de objetos no formato solicitado
    return Object.keys(uniqueValuesMap).map((key) => {
        return { [key]: uniqueValuesMap[key] };
    });
};

