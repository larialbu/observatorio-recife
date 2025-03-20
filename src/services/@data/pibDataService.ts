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

    const fetchData = await pibData.fetchProcessedData();

    const { current, past } = fetchData.reduce((acc, pib) => {
        const year = `${pib['Ano']}`;
        if (year === this.currentYear) acc.current.push(pib);
        else if (year === pastYear) acc.past.push(pib);
        acc.all.push(pib);
        return acc;
    }, { current: [], past: [], all: [] });

    const filteredCurrentYearData = applyGenericFilters(current, filters);
    const filteredPastYearData = applyGenericFilters(past, filters);
    const filtered = applyGenericFilters(fetchData, filters);

    return {
        geral: filtered,
        current: filteredCurrentYearData,
        past: filteredPastYearData,
        rawDataCurrent: current,
        rawDataPast: past
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
