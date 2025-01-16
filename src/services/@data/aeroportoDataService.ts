import { AeroportoData } from "@/@api/http/to-charts/aeroporto/AeroportoData";
import { applyGenericFilters } from "@/utils/filters/applyGenericFilters";

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

  private getCacheKey(tab: string, filters: Record<string, any>): string {
    return `${tab}-${this.currentYear}-${JSON.stringify(filters.additionalFilters)}`;
  }
  

  private async fetchAenaData(filters: Record<string, any>) {
    const aeroportoService = new AeroportoData(this.currentYear);
    const [passageiros, cargas] = await Promise.all([
      aeroportoService.fetchProcessedAenaPassageirosData(),
      aeroportoService.fetchProcessedAenaCargasData(),
    ]);

    const passageirosFiltered = applyGenericFilters(passageiros, filters);
    const cargasFiltered = applyGenericFilters(cargas, filters);

    return {
      passageiros: passageirosFiltered,
      cargas: cargasFiltered,
    };
  }

  private async fetchAnacData(filters: Record<string, any>) {
    const aeroportoService = new AeroportoData(this.currentYear);
    const geral = await aeroportoService.fetchProcessedData();
    const geralFiltered = applyGenericFilters(geral, filters);
    console.log(geralFiltered);

    return { geral: geralFiltered };
  }

  public async fetchDataForTab(tab: string, filters: Record<string, any>) {
    // Agora usamos getCacheKey que recebe (tab, filters)
    const cacheKey = this.getCacheKey(tab, filters);
  
    // Se já existe no cache com as mesmas seleções:
    if (this.dataCache[cacheKey]) {
      return this.dataCache[cacheKey];
    }
  
    let data;
    if (tab === "aena") {
      data = await this.fetchAenaData(filters);
    } else {
      data = await this.fetchAnacData(filters);
    }
  
    this.dataCache[cacheKey] = data;
    return data;
  }
}

export const aeroportoDataService = AeroportoDataService.getInstance();
