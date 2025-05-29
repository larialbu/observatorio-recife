export const processMunicipiosMonthValues = (data: any, toCompare: string[]) => {
  const dataFull: any[] = []

  for (const keyMuni in data) {
    if (toCompare.includes(keyMuni)) {
        for (const keyMonth in data[keyMuni]) {
            const dataMonthIndex = dataFull.findIndex((obj: any) => obj['mes'] === keyMonth )

            if (dataMonthIndex === -1) {
                dataFull.push({ mes: keyMonth, [keyMuni]: data[keyMuni][keyMonth] })
            } else {
                dataFull[dataMonthIndex] = { ...dataFull[dataMonthIndex], [keyMuni]: data[keyMuni][keyMonth] }
            }
        }
    }
  }

  return dataFull
}
