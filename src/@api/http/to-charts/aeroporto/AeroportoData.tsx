import { fetchData } from "@/@api/config/dataFetcher";
import { AeroportoDataResult } from "@/@types/observatorio/@data/aeroportoData";
import { AenaCargasHeaders, AenaPassageirosHeaders, AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

export class AeroportoData {
  private year: string;
  private static cache: Record<string, AeroportoDataResult> = {};

  constructor(year: string) {
    this.year = year;
  }

  async fetchProcessedData(): Promise<AnacGeralHeaders[]> {
    return fetchData<AnacGeralHeaders[]>(`/aeroporto/anac/anos/${this.year}`, AeroportoData.cache);
  }

  async fetchProcessedAenaPassageirosData(): Promise<AenaPassageirosHeaders[]> {
    return fetchData<AenaPassageirosHeaders[]>(`/aeroporto/aena/passageiro/anos/${this.year}`, AeroportoData.cache);
  }

  async fetchProcessedAenaCargasData(): Promise<AenaCargasHeaders[]> {
    return fetchData<AenaCargasHeaders[]>(`/aeroporto/aena/carga/anos/${this.year}`, AeroportoData.cache);
  }

  clearCache(): void {
    AeroportoData.cache = {};
  }
}
