import { ProcessedAenaCargasData } from "@/@types/observatorio/aeroporto/processedAenaCargasData";
import { ProcessedAenaPassageirosData } from "@/@types/observatorio/aeroporto/processedAenaPassageirosData";
import { ProcessedData } from "@/@types/observatorio/aeroporto/processedData";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_USERNAME = process.env.NEXT_PUBLIC_API_USERNAME;
const API_PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD;

export class AeroportoData {
  private year: string;
  private static cache: Record<string, any> = {}; // Cache estático para todas as instâncias

  constructor(year: string) {
    this.year = year;
  }

  private async fetchData<T>(endpoint: string): Promise<T> {
    if (AeroportoData.cache[endpoint]) {
      console.log("Usando dados em cache para:", endpoint);
      return AeroportoData.cache[endpoint];
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

      AeroportoData.cache[endpoint] = data;

      return data;
    } catch (error) {
      console.error(`Erro em fetchData (${endpoint}):`, error);
      throw error;
    }
  }

  async fetchProcessedData(): Promise<ProcessedData[]> {
    const endpoint = `/aeroporto/anac/anos/${this.year}`;
    return this.fetchData<ProcessedData[]>(endpoint);
  }

  async fetchProcessedAenaPassageirosData(): Promise<ProcessedAenaPassageirosData[]> {
    const endpoint = `/aeroporto/aena/passageiro/anos/${this.year}`;
    return this.fetchData<ProcessedAenaPassageirosData[]>(endpoint);
  }

  async fetchProcessedAenaCargasData(): Promise<ProcessedAenaCargasData[]> {
    const endpoint = `/aeroporto/aena/carga/anos/${this.year}`;
    return this.fetchData<ProcessedAenaCargasData[]>(endpoint);
  }

  clearCache(): void {
    AeroportoData.cache = {};
  }
}

// Para executar imediatamente após a criação da instância
const aeroportoData = new AeroportoData("2024"); // Substitua com o ano desejado
