
import { fetchData } from "@/@api/config/dataFetcher";

const DB_NAME = "parquetDB";
const STORE_NAME = "parquetFiles";

export class CapagData {
  private year: string;
  private static cache: Record<string, any> = {}; // Cache estático para todas as instâncias

  constructor(year: string) {
    this.year = year;
  }

  async fetchProcessedData(): Promise<any[]> {
    const endpoint = `/capag/geral/anos/${this.year}`;
    return fetchData<any[]>(endpoint, CapagData.cache);
  }

  // Limpa o cache de dados
  clearCache(): void {
    CapagData.cache = {};
  }
}

