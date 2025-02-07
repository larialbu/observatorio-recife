
import { PortoData } from "@/@api/http/to-charts/porto/PortoData";
import { getRawData } from "@/utils/filters/@data/getRawData";
import { applyGenericDictionary } from "@/utils/filters/@features/applyGenericDictionary";
import { applyGenericFilters } from "@/utils/filters/@features/applyGenericFilters";

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

    const [atracacao, carga, atracacaoDictionary, cargaDictionary, origemDictionary, destinoDictionary, mercadoriaDictionary] = await Promise.all([
        portoService.fetchAtracacaoPorAno(),
        portoService.fetchCargaPorAno(),
        portoService.fetchAtracacaoDictionaryPorAno(),
        portoService.fetchCargaDictionaryPorAno(),
        portoService.fetchOrigemDictionary(),
        portoService.fetchDestinoDictionary(),
        portoService.fetchMercadoriaDictionary(),
      ]);

      // console.log('FFIILSTES', atracacao, filters, applyGenericFilters(atracacao, filters, true))

      // const atracacaoFiltered = applyGenericDictionary(atracacao, atracacaoDictionary[0]) 
      // const cargaFiltered =  applyGenericDictionary(carga, cargaDictionary[0]) 
      // console.log('FILTERS - 1- ', filters, applyGenericDictionary(carga, cargaDictionary[0]) )
      // const atracacaoFiltered = applyGenericFilters(applyGenericDictionary(atracacao, atracacaoDictionary[0]), filters)
      const atracacaoFiltered = applyGenericFilters(atracacao, filters, true)
      // const cargaFiltered = applyGenericFilters(applyGenericDictionary(carga, cargaDictionary[0]), filters, true)
      const cargaFiltered = carga

      //   console.log('FETCHEEDs', {
      //   atracacao: atracacao,
      //   carga: carga,
      //   dictionaries:{ atracacao: atracacaoDictionary[0], carga: cargaDictionary[0], origem: origemDictionary, destino: destinoDictionary, mercado: mercadoriaDictionary}
      // })
      
      console.log('FETCHEEDs', {
        atracacao: atracacaoFiltered,
        carga: cargaFiltered,
        dictionaries:{ atracacao: atracacaoDictionary[0], carga: cargaDictionary[0], origem: origemDictionary, destino: destinoDictionary, mercado: mercadoriaDictionary}
      })

    return {
        atracacao: atracacaoFiltered,
        carga: cargaFiltered,
        dictionaries:{ atracacao: atracacaoDictionary[0], carga: cargaDictionary[0], origem: origemDictionary, destino: destinoDictionary, mercado: mercadoriaDictionary}
      };
  }



  public async fetchDataForTab(tab: string, filters: Record<string, any>) {
    // Agora usamos getCacheKey que recebe (tab, filters)
    const cacheKey = this.getCacheKey(tab, filters);
  
    // Se já existe no cache com as mesmas seleções:
    if (this.dataCache[cacheKey]) {
      return this.dataCache[cacheKey];
    }
  
    let data = await this.fetchPortoData(filters);


    // let data;
    // if (tab === "aena") {
    //   data = await this.fetchPortoData(filters);
    // } else {
    // //   data = await this.fetchAnacData(filters);
    // }
  
    this.dataCache[cacheKey] = data;
    return data;
  }
}

export const portoDataService = PortoDataService.getInstance();
