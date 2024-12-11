import { BruteData } from "@/@types/observatorio/aeroporto/bruteData";
import { ProcessedData } from "@/@types/observatorio/aeroporto/processedData";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class AeroportoData {
  private year: string;

  constructor(year: string) {
    this.year = year;

  }

  private async fetchData<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar dados da API: ${endpoint}`);
      }

      return await response.json();

    } catch (error) {
      console.error(`Erro em fetchData (${endpoint}):`, error);

      throw error;
    }
  }

  async fetchProcessedData(): Promise<ProcessedData[]> {
    return this.fetchData<ProcessedData[]>(`/aeroporto/embarque-desembarque/2023_2024`);
  }

  async fetchBruteData(): Promise<BruteData[]> {
    return this.fetchData<BruteData[]>(`/aeroporto/${this.year}`);
  }

  setYear(year: string): void {
    this.year = year;
  }

  getYear(): string {
    return this.year;
  }
  
}
