// type dataType = any

// const sla = (data: dataType, acc: 0) => {
//     let output = acc

//     if (data['algo']) {
//       output += acc
//     } 

//     return output
// }

// function transformData(arr: any) {
//     const result = {};
  
//     arr.forEach((item: any) => {
//       result[item.id] = {}; // Inicializa o objeto para o id
  
//       item.acc.forEach((acc: any) => {
//         result[item.id][acc] = 0; // Define o valor do acc como 0
//       });
//     });
  
//     return result;
//   }
  

// export const geralFunction = (data: dataType[], functionsInfos: {id: string, entry: any, acc: any, output: any}[]) => {
//     const idsObj = transformData(functionsInfos)

//     data.map((item) => {
//         functionsInfos.forEach((func) => {
//             func.entry(item, idsObj[func.id][])
//         })

//     })

// }

// const test = [{ id: 'funcRandom', entry: sla, acc: ['acc1', 'acc2'], output: { coluna: 'nomeColuna', val: 0 } }]

// console.log(geralFunction([], test))

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

// // Exemplo de uso:
// const dataArray = [
//     {
//         "Ano": 2024,
//         "CBO Ocupação 2002": "Motorista de caminhão (rotas regionais e internacionais)",
//         "Faixa Etária": "40 A 49 anos",
//         "Tipo Defic": "NAO DEFIC"
//     },
//     {
//         "Ano": 2024,
//         "CBO Ocupação 2002": "Almoxarife",
//         "Faixa Etária": "25 A 29 anos",
//         "Tipo Defic": "NAO DEFIC"
//     }
// ];

// const resultado = geralAccFunction(dataArray, ["Faixa Etária", "Tipo Defic"]);
// console.log(resultado);
