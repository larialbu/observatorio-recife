import { MicroCagedData } from "@/@api/http/to-charts/micro_caged/MicroCagedData";
import { applyGenericFilters } from "@/utils/filters/@features/applyGenericFilters";

export class MicroCagedDataService {
  private static instance: MicroCagedDataService;

  private currentYear: string = "2024";

  private dataCache: Record<string, any> = {};

  private constructor() {}

  public static getInstance(): MicroCagedDataService {
    if (!MicroCagedDataService.instance) {
      MicroCagedDataService.instance = new MicroCagedDataService();
    }
    return MicroCagedDataService.instance;
  }

  public setYear(year: string) {
    this.currentYear = year;
  }

  private getCacheKey(tab: string, filters: Record<string, any>): string {
    return `${tab}-${this.currentYear}-${JSON.stringify(filters.additionalFilters)}`;
  }

  private async fetchGeral(filters: Record<string, any>) {
    const microCagedData = new MicroCagedData(this.currentYear);
    // const pastYear = `${+this.currentYear - 1}`;

    const fetchData = await microCagedData.fetchProcessedDataMicroCaged() 

    console.log('Fetchded', fetchData)

    const filteredData = applyGenericFilters(fetchData, filters);
    // const filteredDataAtiv = applyGenericFilters(fetchData.filter((data) => data['Vínculo Ativo 31/12'] == '1'), filters);
    // const filteredDataNoAtiv = applyGenericFilters(fetchData.filter((data) => data['Vínculo Ativo 31/12'] == '0'), filters);    
    console.log('FiltredData', filteredData)

    return {
      microCaged: filteredData,
      id: "empregos-micro-caged",
    };
  }


  public async fetchDataForTab(tab: string, filters: Record<string, any>): Promise<any> {
    const cacheKey = this.getCacheKey(tab, filters);

    if (this.dataCache[cacheKey]) {
      return this.dataCache[cacheKey];
    }

    let data;
    if (tab === "micro-caged") {
      data = await this.fetchGeral(filters);
    } else {
      data = await this.fetchGeral(filters);
    }

    this.dataCache[cacheKey] = data;
    return data;
  }

  public clearCache() {
    this.dataCache = {};
  }
}

export const microCagedDataService = MicroCagedDataService.getInstance();
