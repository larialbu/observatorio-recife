import { AeroportoData } from "@/@api/http/to-charts/aeroporto/AeroportoData";

export class AeroportoDataService {
  private static instance: AeroportoDataService;
  private currentYear: string = "2024";
  private dataCache: Record<string, any> = {};

  private constructor() {}

  public static getInstance(): AeroportoDataService {
    if (!AeroportoDataService.instance) {
      AeroportoDataService.instance = new AeroportoDataService();
    }
    return AeroportoDataService.instance;
  }

  public setYear(year: string) {
    this.currentYear = year;
  }

  private getCacheKey(tab: string): string {
    return `${tab}-${this.currentYear}`;
  }

  private async fetchAenaData() {
    const aeroportoService = new AeroportoData(this.currentYear);
    const [passageiros, cargas] = await Promise.all([
      aeroportoService.fetchProcessedAenaPassageirosData(),
      aeroportoService.fetchProcessedAenaCargasData()
    ]);
    return { passageiros, cargas };
  }

    private async fetchAnacData() {
        const aeroportoService = new AeroportoData(this.currentYear);
        const [geral] = await Promise.all([
        aeroportoService.fetchProcessedData()
        ]);
        
        return [ { geral }];
    }

  public async fetchDataForTab(tab: string): Promise<any> {
    const cacheKey = this.getCacheKey(tab);
    
    if (this.dataCache[cacheKey]) {
      return this.dataCache[cacheKey];
    }

    let data;
    switch (tab) {
      case "aena":
        data = [await this.fetchAenaData()];
        break;
      case "geral":
      case "comparativo":
      case "embarque":
        data = await this.fetchAnacData();
        break;
      default:
        data = await this.fetchAnacData();
    }

    this.dataCache[cacheKey] = data;
    return data;
  }

  public clearCache() {
    this.dataCache = {};
  }
}

export const aeroportoDataService = AeroportoDataService.getInstance();