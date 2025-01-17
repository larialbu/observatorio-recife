import { RankingData } from "@/@api/http/to-charts/ranking/RankingData";
import { applyGenericFilters } from "@/utils/filters/@features/applyGenericFilters";

export class RankingDataService {
  private static instance: RankingDataService;
  private currentYear: string = "2024";
  private dataCache: Record<string, any> = {};

  private constructor() {}

  public static getInstance(): RankingDataService {
    if (!RankingDataService.instance) {
      RankingDataService.instance = new RankingDataService();
    }
    return RankingDataService.instance;
  }

  public setYear(year: string) {
    this.currentYear = year;
  }

  private getCacheKey(tab: string, filters: Record<string, any>): string {
    return `${tab}-${this.currentYear}-${JSON.stringify(filters.additionalFilters)}`;
  }

  private async fetchRankingGeralData(filters: Record<string, any>) {
    const rankingService = new RankingData(this.currentYear);
    const geral = await rankingService.fetchProcessedGeralData();
    const geralFiltered = applyGenericFilters(geral, filters);
    console.log(geralFiltered);

    return { geral: geralFiltered };
  }

  private async fetchRankingDimensaolData(filters: Record<string, any>) {
    const rankingService = new RankingData(this.currentYear);
    const dimensao = await rankingService.fetchProcessedDimensaoData();
    const dimensaoFiltered = applyGenericFilters(dimensao, filters);
    console.log(dimensaoFiltered);

    return { dimensao: dimensaoFiltered };
  }

  private async fetchRankingIndicadorlData(filters: Record<string, any>) {
    const rankingService = new RankingData(this.currentYear);
    const indicador = await rankingService.fetchProcessedIndicadorData();
    const indicadorFiltered = applyGenericFilters(indicador, filters);
    console.log(indicadorFiltered);

    return { indicador: indicadorFiltered };
  }

  private async fetchRankingPilareslData(filters: Record<string, any>) {
    const rankingService = new RankingData(this.currentYear);
    const pilares = await rankingService.fetchProcessedPilaresData();
    const pilaresFiltered = applyGenericFilters(pilares, filters);
    console.log(pilaresFiltered);

    return { pilares: pilaresFiltered };
  }


  public async fetchDataForTab(tab: string, filters: Record<string, any>) {
    // Agora usamos getCacheKey que recebe (tab, filters)
    const cacheKey = this.getCacheKey(tab, filters);
  
    // Se já existe no cache com as mesmas seleções:
    if (this.dataCache[cacheKey]) {
      return this.dataCache[cacheKey];
    }
  
    let data;
    if (tab === "dimensao") {
      data = await this.fetchRankingDimensaolData(filters);
    } else if (tab === 'indicador') {
        data = await this.fetchRankingIndicadorlData(filters);
    } else if (tab === 'pilares') {
        data = await this.fetchRankingPilareslData(filters);
    } else {
      data = await this.fetchRankingGeralData(filters);
    }
  
    this.dataCache[cacheKey] = data;
    return data;
  }
}

export const rankingDataService = RankingDataService.getInstance();
