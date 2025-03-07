import { ProcessedRankingDimensaoData } from "@/@types/observatorio/ranking/processedRankingDimensaoData";
import { ProcessedRankingGeralData } from "@/@types/observatorio/ranking/processedRankingGeralData";
import { ProcessedRankingIndicadorData } from "@/@types/observatorio/ranking/processedRankingIndicadorData";
import { ProcessedRankingPilaresData } from "@/@types/observatorio/ranking/processedRankingPilaresData";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_USERNAME = process.env.NEXT_PUBLIC_API_USERNAME;
const API_PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD;

export class RankingData {
  private year: string;
  private static cache: Record<string, any> = {}; // Cache estático para todas as instânciasx

  constructor(year: string) {
    this.year = year;
  }

  private async fetchData<T>(endpoint: string): Promise<T> {
    if (RankingData.cache[endpoint]) {
      console.log("Usando dados em cache para:", endpoint);
      return RankingData.cache[endpoint];
    }


    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`${API_USERNAME}:${API_PASSWORD}`)}`, // Autenticação básica
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar dados da API: ${endpoint}`);
      }

      const data = await response.json();

      RankingData.cache[endpoint] = data;

      return data;
    } catch (error) {
      console.error(`Erro em fetchData (${endpoint}):`, error);
      throw error;
    }
  }

//   /geral/anos/
//   /dimensao/anos/
//   /indicador/anos/
//   /pilares/anos/

  async fetchProcessedGeralData(): Promise<ProcessedRankingGeralData[]> {
    const endpoint = `/ranking/geral/anos/${this.year}`;
    return this.fetchData<ProcessedRankingGeralData[]>(endpoint);
  }

  async fetchProcessedDimensaoData(): Promise<ProcessedRankingDimensaoData[]> {
    const endpoint = `/ranking/dimensao/anos/${this.year}`;
    return this.fetchData<ProcessedRankingDimensaoData[]>(endpoint);
  }

  async fetchProcessedIndicadorData(): Promise<ProcessedRankingIndicadorData[]> {
    const endpoint = `/ranking/indicador/anos/${this.year}`;
    return this.fetchData<ProcessedRankingIndicadorData[]>(endpoint);
  }

  async fetchProcessedPilaresData(): Promise<ProcessedRankingPilaresData[]> {
    const endpoint = `/ranking/pilares/anos/${this.year}`;
    return this.fetchData<ProcessedRankingPilaresData[]>(endpoint);
  }

  clearCache(): void {
    RankingData.cache = {};
  }
}
