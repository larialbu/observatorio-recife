export const getAccSalario = (data: any, keysObj: string[]) => {
    const dataSalario = data.reduce((acc: any, obj: any) => {

      keysObj.map((key) => {
        if (!acc[key]) {
          acc[key] = {}
        }

        if (!acc[key][obj[key]]) {
          acc[key][obj[key]] = 0
        }

        acc[key][obj[key]] += obj['salário']
      })
        

        return acc
    }, {})

    return dataSalario
}