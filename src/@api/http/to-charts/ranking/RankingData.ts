import { ProcessedRankingDimensaoData } from "@/@types/observatorio/@fetch/ranking/processedRankingDimensaoData";
import { ProcessedRankingGeralData } from "@/@types/observatorio/@fetch/ranking/processedRankingGeralData";
import { ProcessedRankingIndicadorData } from "@/@types/observatorio/@fetch/ranking/processedRankingIndicadorData";
import { ProcessedRankingPilaresData } from "@/@types/observatorio/@fetch/ranking/processedRankingPilaresData";
import { fetchData } from "@/@api/config/dataFetcher";


export class RankingData {
  private year: string;
  private static cache: Record<string, any> = {};

  constructor(year: string) {
    this.year = year;
  }


  async fetchProcessedGeralData(): Promise<ProcessedRankingGeralData[]> {
    const endpoint = `/ranking/geral/anos/${this.year}`;
    return fetchData<ProcessedRankingGeralData[]>(endpoint, RankingData.cache);
  }

  async fetchProcessedDimensaoData(): Promise<ProcessedRankingDimensaoData[]> {
    const endpoint = `/ranking/dimensao/anos/${this.year}`;
    return fetchData<ProcessedRankingDimensaoData[]>(endpoint, RankingData.cache);
  }

  async fetchProcessedIndicadorData(): Promise<ProcessedRankingIndicadorData[]> {
    const endpoint = `/ranking/indicador/anos/${this.year}`;
    return fetchData<ProcessedRankingIndicadorData[]>(endpoint, RankingData.cache);
  }

  async fetchProcessedPilaresData(): Promise<ProcessedRankingPilaresData[]> {
    const endpoint = `/ranking/pilares/anos/${this.year}`;
    return fetchData<ProcessedRankingPilaresData[]>(endpoint, RankingData.cache);
  }

  clearCache(): void {
    RankingData.cache = {};
  }
}
