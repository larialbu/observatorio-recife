import { fetchData } from "@/@api/config/dataFetcher";
import { AenaCargasData, AenaPassageirosData, AnacGeralData } from "@/@types/observatorio/@data/aeroportoData";

const DB_NAME = "parquetDB";
const STORE_NAME = "parquetFiles";

export class AeroportoData {
  private year: string;
  private static cache: Record<string, any> = {};

  constructor(year: string) {
    this.year = year;
  }

  async fetchProcessedData(): Promise<AnacGeralData[]> {
    return fetchData<AnacGeralData[]>(`/aeroporto/anac/anos/${this.year}`, AeroportoData.cache);
  }

  async fetchProcessedAenaPassageirosData(): Promise<AenaPassageirosData[]> {
    return fetchData<AenaPassageirosData[]>(`/aeroporto/aena/passageiro/anos/${this.year}`, AeroportoData.cache);
  }

  async fetchProcessedAenaCargasData(): Promise<AenaCargasData[]> {
    return fetchData<AenaCargasData[]>(`/aeroporto/aena/carga/anos/${this.year}`, AeroportoData.cache);
  }

  clearCache(): void {
    AeroportoData.cache = {};
  }
}
