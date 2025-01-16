import { ProcessedIPCAGeralData } from "@/@types/observatorio/ipca/processedIPCAGeralData";
import { ProcessedIPCAGruposData } from "@/@types/observatorio/ipca/processedIPCAGruposData";
import { ProcessedIPCATabelasData } from "@/@types/observatorio/ipca/processedIPCATabelasData";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_USERNAME = process.env.NEXT_PUBLIC_API_USERNAME;
const API_PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD;

export class IPCAData {
  private year: string;
  private static cache: Record<string, any> = {}; // Cache estático para todas as instânciasx

  constructor(year: string) {
    this.year = year;
  }

  private async fetchData<T>(endpoint: string): Promise<T> {
    if (IPCAData.cache[endpoint]) {
      console.log("Usando dados em cache para:", endpoint);
      return IPCAData.cache[endpoint];
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

      IPCAData.cache[endpoint] = data;

      return data;
    } catch (error) {
      console.error(`Erro em fetchData (${endpoint}):`, error);
      throw error;
    }
  }

  async fetchProcessedGeralData(): Promise<ProcessedIPCAGeralData[]> {
    const endpoint = `/ipca/indice_geral/anos/${this.year}`;
    return this.fetchData<ProcessedIPCAGeralData[]>(endpoint);
  }

  async fetchProcessedGruposData(): Promise<ProcessedIPCAGruposData[]> {
    const endpoint = `/ipca/grupos/anos/${this.year}`;
    return this.fetchData<ProcessedIPCAGruposData[]>(endpoint);
  }

  async fetchProcessedTabelasData(): Promise<ProcessedIPCATabelasData[]> {
    const endpoint = `/ipca/tabelas/anos/${this.year}`;
    return this.fetchData<ProcessedIPCATabelasData[]>(endpoint);
  }

  clearCache(): void {
    IPCAData.cache = {};
  }
}
