import { EmpregosData } from "@/@api/http/to-charts/empregos/EmpregosData";
import { applyGenericFilters } from "@/utils/filters/@features/applyGenericFilters";

export class EmpregosDataService {
  private static instance: EmpregosDataService;

  private currentYear: string = "2024";

  private dataCache: Record<string, any> = {};

  private constructor() {}

  public static getInstance(): EmpregosDataService {
    if (!EmpregosDataService.instance) {
      EmpregosDataService.instance = new EmpregosDataService();
    }
    return EmpregosDataService.instance;
  }

  public setYear(year: string) {
    this.currentYear = year;
  }

  private getCacheKey(tab: string, filters: Record<string, any>): string {
    return `${tab}-${this.currentYear}-${JSON.stringify(filters.additionalFilters)}`;
  }

  private async fetchGeralCaged(filters: Record<string, any>) {
    const empregosData = new EmpregosData(this.currentYear);
    // const pastYear = `${+this.currentYear - 1}`;

    const fetchData = await empregosData.fetchProcessedDataCaged();

    const filteredData = fetchData;
    // const filteredData = applyGenericFilters(fetchData, filters);

    return {
        caged: filteredData,
        id: "empregos-caged"
    };
  }


  public async fetchDataForTab(tab: string, filters: Record<string, any>): Promise<any> {
    const cacheKey = this.getCacheKey(tab, filters);

    if (this.dataCache[cacheKey]) {
      return this.dataCache[cacheKey];
    }

    let data;
    if (tab === "rais") {
      data = await this.fetchGeralCaged(filters);
    } else {
      data = await this.fetchGeralCaged(filters);
    }

    this.dataCache[cacheKey] = data;
    return data;
  }

  public clearCache() {
    this.dataCache = {};
  }
}

export const empregosDataService = EmpregosDataService.getInstance();
