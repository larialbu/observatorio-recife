export const processAccValues = (data: any[]) => {
    const objData = data.reduce((acc: any, obj: any) => {
        acc["Admissão"] += obj['Admissões']
        acc["Demissão"] += obj['Demissões']
        acc["Saldo"]    += obj['Saldos']
    
        return acc
      } , {"Admissão": 0, "Demissão": 0, "Saldo": 0})

    return Object.entries(objData).map(([label, value]) => ({ label, value })).sort((a, b) => (b.value as number) - (a.value as number))
}