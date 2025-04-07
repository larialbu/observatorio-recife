export function geralAccFunction(dataArray: any, params: any) {
    return dataArray.reduce((acc: any, item: any) => {
        params.forEach((param: any) => {
            if (!acc[param]) acc[param] = {};
            const value = item[param];
            acc[param][value] = (acc[param][value] || 0) + 1;
        });
        return acc;
    }, {});
}

export function cnaeAccFunction(dataArray: any, cnaeParam: string) {
    return dataArray.reduce((acc: any, item: any) => {
        const cnae = item[cnaeParam];

        // Extrair a divisão (2 primeiros números)
        const divisao = cnae.slice(0, 2);

        // Extrair o grupo (3 primeiros números)
        const grupo = cnae.slice(0, 3);

        // Extrair a classe (5 primeiros números)
        const classe = cnae.slice(0, 5);

        // Inicializar os objetos se não existirem
        if (!acc.divisao) acc.divisao = {};
        if (!acc.grupo) acc.grupo = {};
        if (!acc.classe) acc.classe = {};

        // Contabilizar as divisões
        acc.divisao[divisao] = (acc.divisao[divisao] || 0) + 1;

        // Contabilizar os grupos
        acc.grupo[grupo] = (acc.grupo[grupo] || 0) + 1;

        // Contabilizar as classes
        acc.classe[classe] = (acc.classe[classe] || 0) + 1;

        return acc;
    }, {});
}

type Item = {
    label: string;
    value: number;
  };
  
  export function uniqueLabel(arr: Item[]): Item[] {
    const resultado: Record<string, number> = {};
  
    for (const item of arr) {
      const { label, value } = item;
  
      if (resultado[label]) {
        resultado[label] += value;
      } else {
        resultado[label] = value;
      }
    }
  
    return Object.entries(resultado).map(([label, value]) => ({ label, value }));
  }
  

// divisao 01
// divisao secao 01
// grupo 011
// classe 01121