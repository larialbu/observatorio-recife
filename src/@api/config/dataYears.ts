import { listIndexedDBKeys } from "../cache/indexDB"

const fixPib = (arrayList: string[]) => {
    const cloneArrayList = [...arrayList]

    cloneArrayList.push('/pib/geral/anos/2020')
    cloneArrayList.push('/pib/geral/anos/2021')
    // cloneArrayList.push('/pib/geral/anos/2022')

    return cloneArrayList
} 

export const dataYears = async (endpoint: string) => {
    const list = fixPib(await listIndexedDBKeys("parquetDB", "parquetFiles"))

    const listFiltred = list.filter((endpointMap) => endpointMap.includes(endpoint?.includes('balanco-comercial') || endpoint?.includes('porto') ? endpoint : `${endpoint}/anos/`))

    const yearsList = listFiltred.map((route) => {
        const parts = route.split('/');
        return parts[parts.length - 1]; 
    });
    
    return yearsList
}

// /pib/geral/anos