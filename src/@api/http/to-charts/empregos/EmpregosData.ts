import { ProcessedDataPib } from "@/@types/observatorio/pib/ProcessedDataPib";

import { fetchData } from "@/@api/config/dataFetcher";

const DB_NAME = "parquetDB";
const STORE_NAME = "parquetFiles";

export class EmpregosData {
  private year: string;
  private static cache: Record<string, any> = {}; // Cache estático para todas as instâncias

  constructor(year: string) {
    this.year = year;
  }

  async fetchProcessedDataCaged(): Promise<ProcessedDataPib[]> {
    const endpoint = `/empregos/caged/anos/${this.year}`;
    return fetchData<ProcessedDataPib[]>(endpoint, EmpregosData.cache);
  }

  async fetchProcessedDataDesemprego(): Promise<ProcessedDataPib[]> {
    const endpoint = `/empregos/caged/anos/${this.year}`;
    return fetchData<ProcessedDataPib[]>(endpoint, EmpregosData.cache);
  }

  // Limpa o cache de dados
  clearCache(): void {
    EmpregosData.cache = {};
  }
}

