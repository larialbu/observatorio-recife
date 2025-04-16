import { fetchData } from "@/@api/config/dataFetcher";
import { BalancaGeralData } from "@/@types/observatorio/@data/balancaComercialData";
import { BalancaHeaders } from "@/@types/observatorio/@fetch/balanca-comercial";


export class BalancaComercialData {
  private year: string;
  private static cache: Record<string, BalancaGeralData> = {};

  constructor(year: string) {
    this.year = year;
  }

  async fetchProcessedData(): Promise<BalancaHeaders[]> {
    return fetchData<BalancaHeaders[]>(`/balanco-comercial/geral/${this.year}`, BalancaComercialData.cache);
  }

  clearCache(): void {
    BalancaComercialData.cache = {};
  }
}
