
import { PortoData } from "@/@api/http/to-charts/porto/PortoData";
import { applyGenericFilters } from "@/utils/filters/@features/applyGenericFilters";
import { setDataHeaders } from "@/utils/filters/@features/setDataHeaders";
import { atracacaoHeader } from "@/utils/headers/porto/atracacaoHeader";
import { cargaHeader } from "@/utils/headers/porto/cargaHeader";

export class PortoDataService {
  private static instance: PortoDataService;
  private currentYear: string = "2024";
  private dataCache: Record<string, any> = {};

  private constructor() {}

  public static getInstance(): PortoDataService {
    if (!PortoDataService.instance) {
      PortoDataService.instance = new PortoDataService();
    }
    return PortoDataService.instance;
  }

  public setYear(year: string) {
    this.currentYear = year;
  }

  private getCacheKey(tab: string, filters: Record<string, any>): string {
    return `${tab}-${this.currentYear}-${JSON.stringify(filters.additionalFilters)}`;
  }
  

  private async fetchPortoData(filters: Record<string, any>) {
    const portoService = new PortoData(this.currentYear);

    const [atracacao, carga, atracacaoDictionary, cargaDictionary, origemDictionary, destinoDictionary, mercadoriaDictionary, coords] = await Promise.all([
        portoService.fetchAtracacaoPorAno(),
        portoService.fetchCargaPorAno(),
        portoService.fetchAtracacaoDictionaryPorAno(),
        portoService.fetchCargaDictionaryPorAno(),
        portoService.fetchOrigemDictionary(),
        portoService.fetchDestinoDictionary(),
        portoService.fetchMercadoriaDictionary(),
        portoService.fetchCoordinates(),
      ]);
      
      const atracacaoHeaderData = setDataHeaders({
        data: atracacao,
        header: atracacaoHeader
      })


      const cargaHeaderData = setDataHeaders({
        data: carga,
        header: cargaHeader
      })

      const atracacaoFiltered = applyGenericFilters(atracacaoHeaderData, filters)

      const codCDTUP = atracacaoFiltered.filteredData[0]['CDTUP']
    
      const cargaFiltered = cargaHeaderData.filter((item) => {
        if (item.Origem === codCDTUP || item.Destino === codCDTUP) {
          return item;
        }
      })

      console.log(coords)

    return {
        atracacao: atracacaoFiltered,
        carga: cargaFiltered,
        rawData: { atracacao: atracacaoHeaderData, carga: cargaHeaderData},
        dictionaries:{ atracacao: atracacaoDictionary[0], carga: cargaDictionary[0], origem: origemDictionary, destino: destinoDictionary, mercado: mercadoriaDictionary},
        coords: coords,
      };
  }



  public async fetchDataForTab(tab: string, filters: Record<string, any>) {
    // Agora usamos getCacheKey que recebe (tab, filters)
    const cacheKey = this.getCacheKey(tab, filters);
  
    // Se já existe no cache com as mesmas seleções:
    if (this.dataCache[cacheKey]) {
      return this.dataCache[cacheKey];
    }

    let data;
    if (tab === "geral") {
      data = await this.fetchPortoData(filters);
    } else {
      data = await this.fetchPortoData(filters)
    }
  
    this.dataCache[cacheKey] = data;
    return data;
  }
}

export const portoDataService = PortoDataService.getInstance();
