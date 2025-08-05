import { listIndexedDBKeys } from "../cache/indexDB"

export const dataYears = async (endpoint: string) => {
    const list = await listIndexedDBKeys("parquetDB", "parquetFiles") 

    const listFiltred = list.filter((endpointMap) => endpointMap.includes(endpoint?.includes('balanco-comercial') || endpoint?.includes('porto') ? endpoint : `${endpoint}/anos/`))

    const yearsList = listFiltred.map((route) => {
        const parts = route.split('/');
        return parts[parts.length - 1]; 
    });
    
    return yearsList.filter((year) => Number(+year))
}
