import { TributosData } from "@/@api/http/to-charts/tributos/TributosData";
import { applyGenericFilters } from "@/utils/filters/@features/applyGenericFilters";
import { applyHashedFilters } from "@/utils/filters/@features/applyHashedFilters";
import { gropoHash } from "@/utils/hashs/micro-caged/gropoHash";

export class TributosDataService {
  private static instance: TributosDataService;

  private currentYear: string = "2024";

  private dataCache: Record<string, any> = {};

  private constructor() {}

  public static getInstance(): TributosDataService {
    if (!TributosDataService.instance) {
      TributosDataService.instance = new TributosDataService();
    }
    return TributosDataService.instance;
  }

  public setYear(year: string) {
    this.currentYear = year;
  }

  private getCacheKey(tab: string, filters: Record<string, any>): string {
    return `${tab}-${this.currentYear}-${JSON.stringify(filters.additionalFilters)}`;
  }

  // tab1 tab2 tab3    
  private async fetchITBI(filters: any) {
    const tributosData = new TributosData(this.currentYear);

    const fetchData = await tributosData.fetchProcessedITBI() 

    const filteredData = applyGenericFilters(fetchData, filters);

    return {
      tributos: filteredData,
      rawData: fetchData,
      id: "tributos-itbi",
    };
  }

  // tab4 tab5 tab6 
  private async fetchIPTU(filters: any) {
    const tributosData = new TributosData(this.currentYear);

    const fetchData = await tributosData.fetchProcessedIPTU() 

    const filteredData = applyGenericFilters(fetchData, filters);

    return {
      tributos: filteredData,
      rawData: fetchData,
      id: "tributos-iptu",
    };
  }

  public async fetchDataForTab(tab: string, filters: Record<string, any>): Promise<any> {
    console.log('Tab ->', tab, tab === 'geral', filters)
    const cacheKey = this.getCacheKey(tab, filters);

    if (this.dataCache[cacheKey]) {
      console.log('dataCache -> ', this.dataCache)
      return this.dataCache[cacheKey];
    }

    let data;
    if (tab === "geral") {
      data = await this.fetchITBI(filters);
    } else if (tab === "itbi-avaliacoes") {
      data = await this.fetchITBI(filters);
    } else if (tab === "itbi-pesquisa") {
      data = await this.fetchITBI(filters);
    } else if (tab === "iptu-contribuintes") {
      data = await this.fetchIPTU(filters);
    } else if (tab === "iptu-valores") {
      data = await this.fetchIPTU(filters);
    } else if (tab === "iptu-pesquisa") {
      data = await this.fetchIPTU(filters);
    } else {
      data = await this.fetchITBI(filters);
    } 
    // fetchEmpresasAbertasFechadas
    this.dataCache[cacheKey] = data;
    return data;
  }

  public clearCache() {
    this.dataCache = {};
  }
}

export const tributosDataService = TributosDataService.getInstance();
