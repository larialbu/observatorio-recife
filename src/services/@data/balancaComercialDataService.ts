import { BalancaComercialData } from "@/@api/http/to-charts/bal_comercial/BalancaComercialData";
import type { BalancaGeralData } from "@/@types/observatorio/@data/balancaComercialData";
import { Filters } from "@/@types/observatorio/shared";
import { applyGenericFilters } from "@/utils/filters/@features/applyGenericFilters";

export class BalancaDataService {
  private static instance: BalancaDataService;

  private currentYear: string = "2024";

  private dataCache: Record<string, BalancaGeralData> = {};

  private constructor() {}

  public static getInstance(): BalancaDataService {
    if (!BalancaDataService.instance) {
      BalancaDataService.instance = new BalancaDataService();
    }
    return BalancaDataService.instance;
  }

  public setYear(year: string) {
    this.currentYear = year;
  }

  private getCacheKey(tab: string, filters: Filters): string {
    return `${tab}-${this.currentYear}-${JSON.stringify(filters.additionalFilters)}`;
  }

  private async fetchGeralData(filters: Filters): Promise<BalancaGeralData> {
    const balancaService = new BalancaComercialData(this.currentYear);

    const raw = await balancaService.fetchProcessedData();

    const filtered = applyGenericFilters(raw, filters);


    console.log('FEtchedBal', filtered)

    return {
      geral: filtered,
      id: "balanca",
    };
  }

  public async fetchDataForTab(tab: string, filters: Filters): Promise<BalancaGeralData> {
    const cacheKey = this.getCacheKey(tab, filters);

    if (this.dataCache[cacheKey]) {
      return this.dataCache[cacheKey];
    }

    const data = await this.fetchGeralData(filters);
    this.dataCache[cacheKey] = data;
    return data;
  }

  public clearCache() {
    this.dataCache = {};
  }
}

export const balancaDataService = BalancaDataService.getInstance();
