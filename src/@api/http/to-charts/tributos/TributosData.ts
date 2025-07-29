
import { fetchData } from "@/@api/config/dataFetcher";

const DB_NAME = "parquetDB";
const STORE_NAME = "parquetFiles";

export class TributosData {
  private year: string;
  private static cache: Record<string, any> = {}; // Cache estático para todas as instâncias

  constructor(year: string) {
    this.year = year;
  }

  // tab1 tab2 tab3 
  async fetchProcessedITBI(): Promise<any[]> {
    const endpoint = `/itbi/geral/anos/${this.year}`;
    return fetchData<any[]>(endpoint, TributosData.cache);
  }

  // tab4 tab5 tab6 
  async fetchProcessedIPTU(): Promise<any[]> {
    const endpoint = `/iptu/geral/anos/${this.year}`;
    return fetchData<any[]>(endpoint, TributosData.cache);
  }

  // Limpa o cache de dados
  clearCache(): void {
    TributosData.cache = {};
  }
}

