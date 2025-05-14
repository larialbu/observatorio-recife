import { fetchData } from "@/@api/config/dataFetcher";

const DB_NAME = "parquetDB";
const STORE_NAME = "parquetFiles";

export class MicroCagedData {
  private year: string;
  private static cache: Record<string, any> = {}; // Cache estático para todas as instâncias

  constructor(year: string) {
    this.year = year;
  }

  async fetchProcessedDataMicroCaged(): Promise<any[]> {
    const endpoint = `/empregos/micro-caged/anos/${this.year}`;
    return fetchData<any[]>(endpoint, MicroCagedData.cache);
  }

  // Limpa o cache de dados
  clearCache(): void {
    MicroCagedData.cache = {};
  }
}

