import { ProcessedData } from "@/@types/observatorio/balanca-comercial/processedData";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_USERNAME = process.env.NEXT_PUBLIC_API_USERNAME;
const API_PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD;

export class BalancaComercialData {
  private year: string;
  private static cache: Record<string, any> = {}; // Cache estático para todas as instânciasx

  constructor(year: string) {
    this.year = year;
  }

  private async fetchData<T>(endpoint: string): Promise<T> {
    if (BalancaComercialData.cache[endpoint]) {
      console.log("Usando dados em cache para:", endpoint);
      return BalancaComercialData.cache[endpoint];
    }

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

      BalancaComercialData.cache[endpoint] = data;

      return data;
    } catch (error) {
      console.error(`Erro em fetchData (${endpoint}):`, error);
      throw error;
    }
  }

  async fetchProcessedData(): Promise<ProcessedData[]> {
    const endpoint = `/balanco-comercial/geral/${this.year}`;
    return this.fetchData<ProcessedData[]>(endpoint);
  }

  clearCache(): void {
    BalancaComercialData.cache = {};
  }
}
