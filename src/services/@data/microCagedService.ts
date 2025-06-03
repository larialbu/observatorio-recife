import { MicroCagedData } from "@/@api/http/to-charts/micro_caged/MicroCagedData";
import { applyGenericFilters } from "@/utils/filters/@features/applyGenericFilters";
import { applyHashedFilters } from "@/utils/filters/@features/applyHashedFilters";
import { gropoHash } from "@/utils/hashs/micro-caged/gropoHash";

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
    const filtersHashed = applyHashedFilters(filters, 'grupamento', 'seção', gropoHash)

    const microCagedData = new MicroCagedData(this.currentYear);

    const fetchData = await microCagedData.fetchProcessedDataMicroCaged() 

    const filteredData = applyGenericFilters(fetchData, filtersHashed, ['grupamento']);

    return {
      microCaged: filteredData,
      id: "empregos-micro-caged",
    };
  }

  private async fetchMedia(filters: Record<string, any>) {
    const microCagedData = new MicroCagedData(this.currentYear);
    const pastYear = `${+this.currentYear - 1}`

    const [microCagedCur, microCagedPast] = await Promise.all([microCagedData.fetchProcessedDataMicroCaged(), new MicroCagedData(pastYear).fetchProcessedDataMicroCaged().catch(() => [])])

    const filteredDataCur = applyGenericFilters(microCagedCur, filters)
    const filteredDataPast = applyGenericFilters(microCagedPast, filters)

    // const fetchData = await microCagedData.fetchProcessedDataMicroCaged() 

    // const filteredData = applyGenericFilters(fetchData, filters);

    return {
      // microCaged: filteredDataCur,
      microCaged: {
        current: filteredDataCur,
        past: filteredDataPast
      },
      id: "empregos-micro-caged-media",
    };
  }


  public async fetchDataForTab(tab: string, filters: Record<string, any>): Promise<any> {
    const cacheKey = this.getCacheKey(tab, filters);

    if (this.dataCache[cacheKey]) {
      return this.dataCache[cacheKey];
    }

    let data;
    if (tab === "comparativo-med") {
      data = await this.fetchMedia(filters);
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
