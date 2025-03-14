import { ProcessedData } from "@/@types/observatorio/balanca-comercial/processedData";
import { fetchData } from "@/@api/config/dataFetcher";


export class BalancaComercialData {
  private year: string;
  private static cache: Record<string, any> = {};

  constructor(year: string) {
    this.year = year;
  }

  async fetchProcessedData(): Promise<ProcessedData[]> {
    return fetchData<ProcessedData[]>(`/balanco-comercial/geral/${this.year}`, BalancaComercialData.cache);
  }

  clearCache(): void {
    BalancaComercialData.cache = {};
  }
}
