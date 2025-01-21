import { ProcessedIpcaGeralData } from "@/@types/observatorio/ipca/processedIPCAGeralData";
import { ProcessedIpcaGruposData } from "@/@types/observatorio/ipca/processedIPCAGruposData";
import { ProcessedIpcaTabelasData } from "@/@types/observatorio/ipca/processedIPCATabelasData";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_USERNAME = process.env.NEXT_PUBLIC_API_USERNAME;
const API_PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD;

export class IpcaData {
  private year: string;
  private static cache: Record<string, any> = {}; // Cache estático para todas as instânciasx

  constructor(year: string) {
    this.year = year;
  }

  private async fetchData<T>(endpoint: string): Promise<T> {
    if (IpcaData.cache[endpoint]) {
      console.log("Usando dados em cache para:", endpoint);
      return IpcaData.cache[endpoint];
    }

console.log('FETCEHD', BASE_URL, endpoint)

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`${API_USERNAME}:${API_PASSWORD}`)}`, // Autenticação básica
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar dados da API: ${endpoint}`);
      }

      const data = await response.json();
      console.log("Resposta JSON recebida:", data);

      IpcaData.cache[endpoint] = data;

      return data;
    } catch (error) {
      console.error(`Erro em fetchData (${endpoint}):`, error);
      throw error;
    }
  }

  async fetchProcessedGeralData(): Promise<ProcessedIpcaGeralData[]> {
    const endpoint = `/ipca/geral/anos/${this.year}`;
    return this.fetchData<ProcessedIpcaGeralData[]>(endpoint);
  }

  async fetchProcessedGruposData(): Promise<ProcessedIpcaGruposData[]> {
    const endpoint = `/ipca/grupos/anos/${this.year}`;
    return this.fetchData<ProcessedIpcaGruposData[]>(endpoint);
  }

  async fetchProcessedTabelasData(): Promise<ProcessedIpcaTabelasData[]> {
    const endpoint = `/ipca/analitico/anos/${this.year}`;
    return this.fetchData<ProcessedIpcaTabelasData[]>(endpoint);
  }

  clearCache(): void {
    IpcaData.cache = {};
  }
}
