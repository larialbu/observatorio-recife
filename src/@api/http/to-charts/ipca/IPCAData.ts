import { ProcessedIpcaGeralData } from "@/@types/observatorio/ipca/processedIPCAGeralData";
import { ProcessedIpcaGruposData } from "@/@types/observatorio/ipca/processedIPCAGruposData";
import { ProcessedIpcaTabelasData } from "@/@types/observatorio/ipca/processedIPCATabelasData";
import { parquetRead } from "hyparquet";
import { compressors } from "hyparquet-compressors";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_USERNAME = process.env.NEXT_PUBLIC_API_USERNAME;
const API_PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD;

export class IpcaData {
  private year: string;
  private static cache: Record<string, any> = {}; // Cache estático para todas as instâncias

  constructor(year: string) {
    this.year = year;
  }

  // Método auxiliar para buscar os dados e processar tanto Parquet quanto JSON
  private async fetchData<T>(endpoint: string): Promise<T> {
    if (IpcaData.cache[endpoint]) {
      console.log("Usando dados em cache para:", endpoint);
      return IpcaData.cache[endpoint];
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
        // Processando o arquivo Parquet
        const startTime = performance.now();
        const arrayBuffer = await response.arrayBuffer();

        // Lê o arquivo Parquet e converte os dados para objetos
        const records = await new Promise((resolve, reject) => {
          parquetRead({
            file: arrayBuffer,
            rowFormat: "object",
            compressors,
            onComplete: (data) => resolve(data),
          });
        });

        const endTime = performance.now();
        console.log(`Tempo de execução para Parquet: ${(endTime - startTime).toFixed(2)} ms`);
        data = records;
      } else {
        // Processando o arquivo JSON
        const text = await response.text();
        data = JSON.parse(text);
      }

      // Armazenando no cache
      IpcaData.cache[endpoint] = data;

      return data;
    } catch (error) {
      console.error(`Erro em fetchData (${endpoint}):`, error);
      throw error;
    }
  }

  // Métodos para buscar dados processados de IPCA

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

  // Método para limpar o cache
  clearCache(): void {
    IpcaData.cache = {};
  }
}
