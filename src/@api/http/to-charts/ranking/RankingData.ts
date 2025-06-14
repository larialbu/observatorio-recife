// import { any } from "@/@types/observatorio/@fetch/ranking/any";
// import { any } from "@/@types/observatorio/@fetch/ranking/any";
// import { any } from "@/@types/observatorio/@fetch/ranking/any";
// import { any } from "@/@types/observatorio/@fetch/ranking/any";
import { fetchData } from "@/@api/config/dataFetcher";


export class RankingData {
  private year: string;
  private static cache: Record<string, any> = {};

  constructor(year: string) {
    this.year = year;
  }


  async fetchProcessedGeralData(): Promise<any[]> {
    const endpoint = `/ranking/geral/anos/${this.year}`;
    return fetchData<any[]>(endpoint, RankingData.cache);
  }

  async fetchProcessedDimensaoData(): Promise<any[]> {
    const endpoint = `/ranking/dimensao/anos/${this.year}`;
    return fetchData<any[]>(endpoint, RankingData.cache);
  }

  async fetchProcessedIndicadorData(): Promise<any[]> {
    const endpoint = `/ranking/indicador/anos/${this.year}`;
    return fetchData<any[]>(endpoint, RankingData.cache);
  }

  async fetchProcessedPilaresData(): Promise<any[]> {
    const endpoint = `/ranking/pilares/anos/${this.year}`;
    return fetchData<any[]>(endpoint, RankingData.cache);
  }

  clearCache(): void {
    RankingData.cache = {};
  }
}
