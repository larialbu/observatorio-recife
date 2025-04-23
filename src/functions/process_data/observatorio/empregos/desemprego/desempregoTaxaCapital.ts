export const processDesempregoTaxaCapital = (data: any) => {
    const objData = data.reduce((acc: any, obj: any) =>  {
        if(!acc[obj['Capital']]) {
            acc[obj['Capital']] = 0
        }
    
        acc[obj['Capital']] += obj['Taxa']
    
        return acc
      },{})
    
      return Object.entries(objData).map(([label, value]) => ({ label, value })).sort((a, b) => (b.value as number) - (a.value as number))
}