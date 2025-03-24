import { ProcessedAenaCargasData } from "@/@types/observatorio/aeroporto/processedAenaCargasData";
import { ProcessedAenaPassageirosData } from "@/@types/observatorio/aeroporto/processedAenaPassageirosData";
import { ProcessedData } from "@/@types/observatorio/aeroporto/processedData";

import { fetchData } from "@/@api/config/dataFetcher";

const DB_NAME = "parquetDB";
const STORE_NAME = "parquetFiles";

export class AeroportoData {
  private year: string;
  private static cache: Record<string, any> = {};

  constructor(year: string) {
    this.year = year;
  }

  async fetchProcessedData(): Promise<ProcessedData[]> {
    return fetchData<ProcessedData[]>(`/aeroporto/anac/anos/${this.year}`, AeroportoData.cache);
  }

  async fetchProcessedAenaPassageirosData(): Promise<ProcessedAenaPassageirosData[]> {
    return fetchData<ProcessedAenaPassageirosData[]>(`/aeroporto/aena/passageiro/anos/${this.year}`, AeroportoData.cache);
  }

  async fetchProcessedAenaCargasData(): Promise<ProcessedAenaCargasData[]> {
    return fetchData<ProcessedAenaCargasData[]>(`/aeroporto/aena/carga/anos/${this.year}`, AeroportoData.cache);
  }

  clearCache(): void {
    AeroportoData.cache = {};
  }
}
