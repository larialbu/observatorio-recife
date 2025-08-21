export const processCapagAnoPilar = (data: any, pilarName: string) => {
        const pilar = data
      .map((data: any) => ({ label: `${data['ano']}`, [data['Município']]: data[pilarName] }))

    
    const completed: any[] = []

    for (let i = 0; i < pilar.length; i++) {
      const item = pilar[i];
      const exist = completed.findIndex((data) => data.label === item.label)
      if (exist !== -1) {
        completed[exist] = { ...completed[exist], ...item }
      } else {
        completed.push(item);
      }
    }

    return completed
}