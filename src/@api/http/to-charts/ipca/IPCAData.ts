import { ProcessedIpcaGeralData } from "@/@types/observatorio/ipca/processedIPCAGeralData";
import { ProcessedIpcaGruposData } from "@/@types/observatorio/ipca/processedIPCAGruposData";
import { ProcessedIpcaTabelasData } from "@/@types/observatorio/ipca/processedIPCATabelasData";
import { fetchData } from "@/@api/config/dataFetcher";


export class IpcaData {
  private year: string;
  private static cache: Record<string, any> = {}; // Cache estático para todas as instâncias

  constructor(year: string) {
    this.year = year;
  }

  // Métodos para buscar dados processados de IPCA

  async fetchProcessedGeralData(): Promise<ProcessedIpcaGeralData[]> {
    const endpoint = `/ipca/geral/anos/${this.year}`;
    return fetchData<ProcessedIpcaGeralData[]>(endpoint, IpcaData.cache);
  }

  async fetchProcessedGruposData(): Promise<ProcessedIpcaGruposData[]> {
    const endpoint = `/ipca/grupos/anos/${this.year}`;
    return fetchData<ProcessedIpcaGruposData[]>(endpoint, IpcaData.cache);
  }

  async fetchProcessedTabelasData(): Promise<ProcessedIpcaTabelasData[]> {
    const endpoint = `/ipca/analitico/anos/${this.year}`;
    return fetchData<ProcessedIpcaTabelasData[]>(endpoint, IpcaData.cache);
  }

  // Método para limpar o cache
  clearCache(): void {
    IpcaData.cache = {};
  }
}
