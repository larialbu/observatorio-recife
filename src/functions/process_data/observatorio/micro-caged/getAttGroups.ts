export const getAttGroups = (keyName: 'quantity' | 'value', data: any[], groups: any[]) => {
  const groupsCopy = JSON.parse(JSON.stringify(groups))
  
  for (const key in data) {
    const groupFind = groupsCopy.find((group: any) => group.includes.includes(key)) || null
    if (typeof groupFind?.[keyName] === 'number') groupFind[keyName] += data[key]
  }

  return groupsCopy
}