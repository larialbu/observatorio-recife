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

export const geralAccFieldFunction = (data: any, params: string[], accParam: string) => {
    return data.reduce((acc: any, obj: any) => {
        params.forEach((param) => {
          if (!acc[param]) acc[param] = {} 

          if (!acc[param][obj[param]]) acc[param][obj[param]] = 0

          acc[param][obj[param]] += obj[accParam]
        })

        return acc
      }, {})
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
        if (!acc.setor) acc.setor = {};
        if (!acc.grupo) acc.grupo = {};
        if (!acc.classe) acc.classe = {};

        // Contabilizar as divisões
        acc.divisao[divisao] = (acc.divisao[divisao] || 0) + 1;

        // 1 - 3 agricultura 
        // 5 - 39 industria
        // 41 - 43 construção 
        // 45 - 47 comércio 
        // 49 - 99 serviço

        if (divisao >= 1 && divisao <= 3) {
          acc.setor['agricultura'] = (acc.setor['agricultura'] || 0) + 1
        } else if (divisao >= 5 && divisao <= 39) {
          acc.setor['industria'] = (acc.setor['industria'] || 0) + 1
        } else if (divisao >= 41 && divisao <= 43) {
          acc.setor['construção'] = (acc.setor['construção'] || 0) + 1
        } else if (divisao >= 45 && divisao <= 47) {
          acc.setor['comércio'] = (acc.setor['comércio'] || 0) + 1
        } else if (divisao >= 49 && divisao <= 99) {
          acc.setor['serviço'] = (acc.setor['serviço'] || 0) + 1
        }
        // acc.setor[]

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