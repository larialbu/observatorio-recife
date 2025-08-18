import { CapagData } from "@/@api/http/to-charts/capag/CapagData";
import { applyGenericFilters } from "@/utils/filters/@features/applyGenericFilters";

export class CapagDataService {
  private static instance: CapagDataService;

  private currentYear: string = "2024";

  private dataCache: Record<string, any> = {};

  private constructor() {}

  public static getInstance(): CapagDataService {
    if (!CapagDataService.instance) {
      CapagDataService.instance = new CapagDataService();
    }
    return CapagDataService.instance;
  }

  public setYear(year: string) {
    this.currentYear = year;
  }

  private getCacheKey(tab: string, filters: Record<string, any>): string {
    return `${tab}-${this.currentYear}-${JSON.stringify(filters.additionalFilters)}`;
  }

  private async fetchGeralData(filters: any) {
    const capagData = new CapagData(this.currentYear);

    const fetchData = await capagData.fetchProcessedData() 

    const filteredData = applyGenericFilters(fetchData, filters);

    return {
      capag: filteredData,
      rawData: fetchData,
      id: "capag-geral",
    };
  }

  public async fetchDataForTab(tab: string, filters: Record<string, any>): Promise<any> {
    const cacheKey = this.getCacheKey(tab, filters);

    if (this.dataCache[cacheKey]) {
      return this.dataCache[cacheKey];
    }

    let data;
    if (tab === "geral") {
      data = await this.fetchGeralData(filters);
    } else {
      data = await this.fetchGeralData(filters);
    } 
    // fetchEmpresasAbertasFechadas
    this.dataCache[cacheKey] = data;
    return data;
  }

  public clearCache() {
    this.dataCache = {};
  }
}

export const capagDataService = CapagDataService.getInstance();
