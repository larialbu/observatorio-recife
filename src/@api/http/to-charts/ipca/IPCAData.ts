import { fetchData } from "@/@api/config/dataFetcher";
import { IpcaDataResult } from "@/@types/observatorio/@data/ipcaData";
import { IpcaGeralHeaders, IpcaGrupoHeaders, IpcaTabelaHeaders } from "@/@types/observatorio/@fetch/ipca";


export class IpcaData {
  private year: string;
  private static cache: Record<string, IpcaDataResult[]> = {}; // Cache estático para todas as instâncias

  constructor(year: string) {
    this.year = year;
  }

  // Métodos para buscar dados processados de IPCA

  async fetchProcessedGeralData(): Promise<IpcaGeralHeaders[]> {
    const endpoint = `/ipca/geral/anos/${this.year}`;
    return fetchData<IpcaGeralHeaders[]>(endpoint, IpcaData.cache);
  }

  async fetchProcessedGruposData(): Promise<IpcaGrupoHeaders[]> {
    const endpoint = `/ipca/grupos/anos/${this.year}`;
    return fetchData<IpcaGrupoHeaders[]>(endpoint, IpcaData.cache);
  }

  async fetchProcessedTabelasData(): Promise<IpcaTabelaHeaders[]> {
    const endpoint = `/ipca/analitico/anos/${this.year}`;
    return fetchData<IpcaTabelaHeaders[]>(endpoint, IpcaData.cache);
  }

  // Método para limpar o cache
  clearCache(): void {
    IpcaData.cache = {};
  }
}
