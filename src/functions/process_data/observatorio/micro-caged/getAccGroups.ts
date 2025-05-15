  export const getAccGroups = (data: any, groups: [number, number, number][]) => {
  for (const key in data) {
    const groupFinded = groups.find((group) => Math.ceil(+key) >= group[0] && Math.ceil(+key) <= group[1]) || [0, 0, 0]
    groupFinded[2] += data[key]
  }

  return groups
  }