export const getAccTextGroup = (data: { label: string, value: number }[], groups: {name: string, includes: string[], quantity: number}[]) => {
for (const obj of data) {
    const groupFinded = groups.find((group) => group.includes.includes(obj.label)) || { name: 'Desconhecido', includes: [], quantity: 0 }
    groupFinded.quantity += obj.value
  }

  return groups.map((group) => ({ label: group.name, value: group.quantity}))
}
