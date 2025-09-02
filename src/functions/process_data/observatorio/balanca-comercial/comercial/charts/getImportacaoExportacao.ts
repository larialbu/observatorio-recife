type DataType = Record<string, number> 

export const processGetImportacaoExportacao = (dataImportacao: DataType, dataExportacao: DataType, sort: boolean = false) => {

  const params = Array.from(new Set([Object.keys(dataImportacao), Object.keys(dataExportacao)].flat())) 

  if (sort) {
    return params.map((param) => {
        return { label: param, importacao: dataImportacao?.[param] || 0 , exportacao: dataExportacao?.[param] || 0 };
    }).sort(
        (a, b) => b.importacao + b.exportacao - (a.importacao + a.exportacao)
    )
  }

  return params.map((param) => {
    return { label: param, importacao: dataImportacao?.[param] || 0 , exportacao: dataExportacao?.[param] || 0 };
  })

}