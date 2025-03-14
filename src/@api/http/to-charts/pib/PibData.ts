import { ProcessedDataPib } from "@/@types/observatorio/pib/ProcessedDataPib";
import { parquetRead } from "hyparquet";
import { compressors } from "hyparquet-compressors";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_USERNAME = process.env.NEXT_PUBLIC_API_USERNAME;
const API_PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD;

export class PibData {
  private year: string;
  private static cache: Record<string, any> = {}; // Cache estático para todas as instâncias

  constructor(year: string) {
    this.year = year;
  }

  private async fetchData<T>(endpoint: string): Promise<T> {
    if (PibData.cache[endpoint]) {
      console.log("Usando dados em cache para:", endpoint);
      return PibData.cache[endpoint];
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

      const contentType = response.headers.get("content-type");
      let data: any;

      if (contentType?.includes("application/octet-stream")) {
        const startTime = performance.now();
        const arrayBuffer = await response.arrayBuffer();

        const records = await new Promise((resolve, reject) => {
          parquetRead({
            file: arrayBuffer,
            rowFormat: "object",
            compressors,
            onComplete: (data) => resolve(data),
          });
        });

        const endTime = performance.now();
        console.log(`Tempo de execução: ${(endTime - startTime).toFixed(2)} ms`);
        data = records;
      } else {
        // Caso o conteúdo seja JSON
        const text = await response.text();
        data = JSON.parse(text);
      }

      // Armazena os dados em cache
      PibData.cache[endpoint] = data;

      return data;
    } catch (error) {
      console.error(`Erro em fetchData (${endpoint}):`, error);
      throw error;
    }
  }

  async fetchProcessedData(): Promise<ProcessedDataPib[]> {
    const endpoint = `/pib/geral/anos/${this.year}`;
    // const endpoint = `/balanco-comercial/geral/${this.year}`;
    return this.fetchData<ProcessedDataPib[]>(endpoint);
  }

  async fetchProcessedDataByYear(year: string): Promise<ProcessedDataPib[]> {
    const endpoint = `/pib/geral/anos/${year}`;
    // const endpoint = `/balanco-comercial/geral/${this.year}`;
    return this.fetchData<ProcessedDataPib[]>(endpoint);
  }

  // Limpa o cache de dados
  clearCache(): void {
    PibData.cache = {};
  }
}

