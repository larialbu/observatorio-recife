import { ProcessedDataPib } from "@/@types/observatorio/@fetch/pib/ProcessedDataPib";

import { fetchData } from "@/@api/config/dataFetcher";

const DB_NAME = "parquetDB";
const STORE_NAME = "parquetFiles";

export class RaisData {
  private year: string;
  private static cache: Record<string, any> = {}; // Cache estático para todas as instâncias

  constructor(year: string) {
    this.year = year;
  }

  async fetchProcessedDataRais(): Promise<any[]> {
    const endpoint = `/empregos/rais/recife/anos/${this.year}`;
    return fetchData<any[]>(endpoint, RaisData.cache);
  }

  // Limpa o cache de dados
  clearCache(): void {
    RaisData.cache = {};
  }
}

