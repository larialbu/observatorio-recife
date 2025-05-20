export const getAvarageGroups = (dataSalario: any, dataObj: any) => {
    const copyDataSalario = JSON.parse(JSON.stringify(dataSalario))

    for (const key1 in copyDataSalario) {
      const saldoSex = key1 === 'saldoHomem' || key1 === 'saldoMulher' 
      if (!(saldoSex || key1 === 'saldomovimentação')) {
        for (const keySec1 in copyDataSalario[key1]) {
          // console.log('keys', key1, copyDataSalario[key1], copyDataSalario[key1][keySec1], dataObj?.[key1]?.[keySec1], copyDataSalario[key1][keySec1] / dataObj?.[key1]?.[keySec1])
         
          // sesse ->
          // console.log('keys', key1, keySec1, copyDataSalario[key1][keySec1], dataObj?.[key1]?.[keySec1], copyDataSalario[key1][keySec1] / dataObj?.[key1]?.[keySec1])
          copyDataSalario[key1][keySec1] = copyDataSalario[key1][keySec1] / dataObj?.[key1]?.[keySec1]

          // const admitidoInfo = copyDataSalario[key1][keySec1]
          // const demitidoInfo = dataObj[key1][keySec1] || 0
          // const resultInfo =  admitidoInfo - demitidoInfo

          // copyDataSalario[key1][keySec1] = resultInfo
        }
      }

      // if (key1 === 'saldomovimentação')  copyDataSalario[key1] = { Admitidos: copyDataSalario[key1]['Admitidos'], Demitidos: dataObj[key1]['Demitidos'] } 

      // if (saldoSex) {
      //   for (const key2 in copyDataSalario[key1]) copyDataSalario[key1][key2] = { Admitidos: copyDataSalario[key1][key2]['Admitidos'], Demitidos: dataObj[key1][key2]['Demitidos'] } 
      // }
    }

    return copyDataSalario
}