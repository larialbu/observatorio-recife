import { PibData } from "@/@api/http/to-charts/pib/PibData";
import { applyGenericFilters } from "@/utils/filters/@features/applyGenericFilters";

export class PibDataService {
  private static instance: PibDataService;

  private currentYear: string = "2021";

  private dataCache: Record<string, any> = {};

  private constructor() {}

  public static getInstance(): PibDataService {
    if (!PibDataService.instance) {
      PibDataService.instance = new PibDataService();
    }
    return PibDataService.instance;
  }

  public setYear(year: string) {
    this.currentYear = year;
  }

  private getCacheKey(tab: string, filters: Record<string, any>): string {
    return `${tab}-${this.currentYear}-${JSON.stringify(filters.additionalFilters)}`;
  }


  private async fetchGeralData(filters: Record<string, any>) {
    const pibData = new PibData(this.currentYear);
    const pastYear = `${+this.currentYear - 1}`;

    const yearsToRead = [this.currentYear, pastYear]

    const fetchAll = await Promise.all(filters.years.map((year: string) => pibData.fetchProcessedDataByYear(year).catch(() => [])))
    
    const pibCurrent = fetchAll.filter(pib => yearsToRead[0] === `${pib[0]['Ano']}`)
    const pibPast = fetchAll.filter(pib => yearsToRead[1] === `${pib[0]['Ano']}`) || []
   
    const filtered = applyGenericFilters(fetchAll.flat(), filters)
    const currentYearData = applyGenericFilters(pibCurrent[0], filters)
    const pastYearData = applyGenericFilters(pibPast[0], filters)

    return {
      geral: filtered,
      current: currentYearData,
      past: pastYearData,
      rawDataCurrent: pibCurrent[0]
    };
  }

  public async fetchDataForTab(tab: string, filters: Record<string, any>): Promise<any> {
    const cacheKey = this.getCacheKey(tab, filters);

    if (this.dataCache[cacheKey]) {
      return this.dataCache[cacheKey];
    }

    let data;
    if (tab === "analitico") {
      data = await this.fetchGeralData(filters);
    } else {
      data = await this.fetchGeralData(filters);
    }

    this.dataCache[cacheKey] = data;
    return data;
  }

  public clearCache() {
    this.dataCache = {};
  }
}

export const pibDataService = PibDataService.getInstance();
