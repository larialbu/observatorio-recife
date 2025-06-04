export const getAvarageGroups = (dataSalario: any, dataObj: any) => {
    const copyDataSalario = JSON.parse(JSON.stringify(dataSalario))

    for (const key1 in copyDataSalario) {
      const saldoSex = key1 === 'saldoHomem' || key1 === 'saldoMulher' 
      if (!(saldoSex || key1 === 'saldomovimentação')) {
        for (const keySec1 in copyDataSalario[key1]) {
          copyDataSalario[key1][keySec1] = copyDataSalario[key1][keySec1] / dataObj?.[key1]?.[keySec1]
        }
      }
    }

    return copyDataSalario
}