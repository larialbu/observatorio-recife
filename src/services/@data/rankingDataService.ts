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
    return `${tab}-${JSON.stringify(filters.additionalFilters)}`;
  }

  private async fetchRankingGeralData(filters: Record<string, any>) {
    const years = filters.years; // Lista de anos a serem buscados
    const selectedYear = filters.year; // Ano selecionado para rawData
    const geralDataByYear: Record<string, any[]> = {};
  
    // Busca os dados para todos os anos especificados
    for (const year of years) {
      const rankingService = new RankingData(year);
      const data = await rankingService.fetchProcessedGeralData();
      geralDataByYear[year] = data; // Organiza os dados por ano
    }
  
    // Aplica os filtros aos dados de cada ano sem interferir no ano selecionado
    const filteredData: Record<string, any[]> = {};
    Object.keys(geralDataByYear).forEach((year) => {
      // Aplica filtros apenas aos dados do ano específico
      filteredData[year] = applyGenericFilters(geralDataByYear[year], {
        ...filters,
        year,
      });
    });
  
    // Define os dados brutos com base no ano selecionado
    const rawData = geralDataByYear[this.currentYear] || [];
    const additionalFiltersOptions = applyGenericFilters(rawData, filters).additionalFiltersOptions
  
    const geral = {
      filteredData,
      rawData,
      additionalFiltersOptions
    };
  
    console.log(geral);
  
    return { geral }; // Retorna os dados no formato especificado
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
    const cacheKey = this.getCacheKey(tab, filters);

    if (this.dataCache[cacheKey]) {
      return this.dataCache[cacheKey];
    }

    let data;
    if (tab === "dimensao") {
      data = await this.fetchRankingDimensaolData(filters);
    } else if (tab === "indicador") {
      data = await this.fetchRankingIndicadorlData(filters);
    } else if (tab === "pilares") {
      data = await this.fetchRankingPilareslData(filters);
    } else {
      data = await this.fetchRankingGeralData(filters);
    }

    this.dataCache[cacheKey] = data;
    return data;
  }
}

export const rankingDataService = RankingDataService.getInstance();
