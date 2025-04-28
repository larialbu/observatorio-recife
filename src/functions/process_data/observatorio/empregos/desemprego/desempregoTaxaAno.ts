export const processDesempregoTaxaAno = (data: any) => {
    const getNumber = (tri: string) => +tri.split('º')[0]

    const dataObj = data.map((data: any) =>  ({ ...data, "Trimestre": data['Trimestre'].split(' ').slice(0, 2).join(' ')})).reduce((acc: any, obj: any) => {
      if (!acc[obj["Trimestre"]]) {
        acc[obj["Trimestre"]] = 0
      }
      
      acc[obj["Trimestre"]] += obj["Taxa"]
  
      return acc
    } ,{})
  
    return Object.entries(dataObj).map(([label, value]) => ({ label, value })).sort((a, b) => (getNumber(a.label as string)) - (getNumber(b.label as string)))
}