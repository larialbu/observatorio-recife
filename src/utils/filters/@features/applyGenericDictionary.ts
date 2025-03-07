function invertDictionary(dictionary: any) {
    const invertedDict: { [key: string]: { [value: string]: string } } = {};

    for (const key in dictionary) {
        invertedDict[key] = {};
        for (const dictKey in dictionary[key]) {
            const value = dictionary[key][dictKey];
            invertedDict[key][value] = dictKey;
        }
    }

    return invertedDict;
}

export const applyGenericDictionary = (data: any[], dictionary: any) => {
    const invertedDict = invertDictionary(dictionary);

    const newData = data.map((obj) => {
        const newObj = { ...obj }; // Evita mutação direta
        for (const key in newObj) {
            if (invertedDict[key] && invertedDict[key][newObj[key]] !== undefined) {
                newObj[key] = invertedDict[key][newObj[key]];
            }
        }
        return newObj;
    });

    return newData;
};

// Versão paralela
// nao usamos
export const applyGenericDictionaryParallel = async (data: any[], dictionary: any, chunkSize = 10000) => {
    const invertedDict = invertDictionary(dictionary);

    const chunks = [];
    for (let i = 0; i < data.length; i += chunkSize) {
        chunks.push(data.slice(i, i + chunkSize));
    }

    const results = await Promise.all(
        chunks.map((chunk) =>
            new Promise((resolve) => {
                const processedChunk = chunk.map((obj) => {
                    const newObj = { ...obj };
                    for (const key in newObj) {
                        if (invertedDict[key] && invertedDict[key][newObj[key]] !== undefined) {
                            newObj[key] = invertedDict[key][newObj[key]];
                        }
                    }
                    return newObj;
                });
                resolve(processedChunk);
            })
        )
    );

    return results.flat();
};