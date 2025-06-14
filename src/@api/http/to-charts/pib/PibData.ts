import { ProcessedDataPib } from "@/@types/observatorio/@data/ProcessedDataPib";

import { fetchData } from "@/@api/config/dataFetcher";

const DB_NAME = "parquetDB";
const STORE_NAME = "parquetFiles";

export class PibData {
  private year: string;
  private static cache: Record<string, any> = {}; // Cache estático para todas as instâncias

  constructor(year: string) {
    this.year = year;
  }


  async fetchProcessedData(): Promise<ProcessedDataPib[]> {
    const endpoint = `/pib/geral/anos`;
    return fetchData<ProcessedDataPib[]>(endpoint, PibData.cache);
  }

  async fetchProcessedDataByYear(year: string): Promise<ProcessedDataPib[]> {
    const endpoint = `/pib/geral/anos`;
    return fetchData<ProcessedDataPib[]>(endpoint, PibData.cache);
  }

  // Limpa o cache de dados
  clearCache(): void {
    PibData.cache = {};
  }
}

