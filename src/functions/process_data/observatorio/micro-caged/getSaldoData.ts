export const getSaldoData = (dataAdmitidos: any, dataDemitidos: any) => {
    const dataAdmitidosCopy = JSON.parse(JSON.stringify(dataAdmitidos))
    const dataDemitidosCopy = JSON.parse(JSON.stringify(dataDemitidos))

    for (const key1 in dataAdmitidosCopy) {
      const saldoSex = key1 === 'saldoHomem' || key1 === 'saldoMulher' 
      if (!(saldoSex || key1 === 'saldomovimentação')) {
        for (const keySec1 in dataAdmitidosCopy[key1]) {
          const admitidoInfo = dataAdmitidosCopy[key1][keySec1]
          const demitidoInfo = dataDemitidosCopy[key1][keySec1] || 0
          const resultInfo =  admitidoInfo - demitidoInfo

          dataAdmitidosCopy[key1][keySec1] = resultInfo
        }
      }

      if (key1 === 'saldomovimentação')  dataAdmitidosCopy[key1] = { Admitidos: dataAdmitidosCopy[key1]['Admitidos'], Demitidos: dataDemitidosCopy[key1]['Demitidos'] } 

      if (saldoSex) {
        for (const key2 in dataAdmitidosCopy[key1]) dataAdmitidosCopy[key1][key2] = { Admitidos: dataAdmitidosCopy[key1][key2]['Admitidos'], Demitidos: dataDemitidosCopy[key1][key2]['Demitidos'] } 
      }
    }

    return dataAdmitidosCopy
} 
    
    