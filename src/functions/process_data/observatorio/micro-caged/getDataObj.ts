import { geralAccFunction } from "../rais/demografia/geralFuncition"

export const getDataObj = (data: any[]) => {
  const geralInfos = geralAccFunction(data || [], ['salário', 'saldomovimentação', "tamestabjan", "graudeinstrução", "sexo", "seção", "raçacor", "horascontratuais", "idade"])
  const womanInfos = { saldoMulher: geralAccFunction(data.filter((item: any) => item["sexo"] === "Mulher") || [], ['saldomovimentação' ])}
  const manInfos = { saldoHomem: geralAccFunction(data.filter((item: any) => item["sexo"] === "Homem") || [], ['saldomovimentação' ])}

  return { ...geralInfos, ...womanInfos, ...manInfos }
}