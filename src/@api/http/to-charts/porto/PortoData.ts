/**
 * ESTA PÁGINA NÃO DEVE ARMAZENAR CACHE PELO TAMANHO DE DATA RECEBID
 */

import { parquetRead } from "hyparquet";
import { compressors } from "hyparquet-compressors";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_USERNAME = process.env.NEXT_PUBLIC_API_USERNAME;
const API_PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD;

export class PortoData {
  public year: string;

  constructor(year: string) {
    this.year = year;
  }

  private async fetchData<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`${API_USERNAME}:${API_PASSWORD}`)}`,
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
        const text = await response.text();
        data = JSON.parse(text);
      }

      return data;

    } catch (error) {
      console.error(`Erro em fetchData (${endpoint}):`, error);
      throw error;
    }
  }

  /**
   * Busca dados de atracação para o ano especificado.
   */
  async fetchAtracacaoPorAno(): Promise<any[]> {
    const endpoint = `/porto/atracacao/${this.year}`;
    return this.fetchData<any[]>(endpoint);
  }

  /**
   * Busca dados de carga para o ano especificado.
   */
  async fetchCargaPorAno(): Promise<any[]> {
    const endpoint = `/porto/carga/${this.year}_test`;
    return this.fetchData<any[]>(endpoint);
  }

  /**
   * Busca dados de passageiros para o ano especificado.
   */
  async fetchPassageirosPorAno(): Promise<any[]> {
    const endpoint = `/porto/passageiros/${this.year}`;
    return this.fetchData<any[]>(endpoint)
  }

  /**
   * Busca dicionário de atracação para o ano especificado.
   */
  async fetchAtracacaoDictionaryPorAno(): Promise<any[]> {
    const endpoint = `/porto/dictionaries/atracacao/anos/${this.year}`;
    return this.fetchData<any[]>(endpoint);
  }

  /**
   * Busca dicionário de carga para o ano especificado.
   */
  async fetchCargaDictionaryPorAno(): Promise<any[]> {
    const endpoint = `/porto/dictionaries/carga/anos/${this.year}`;
    return this.fetchData<any[]>(endpoint);
  }

  /**
   * Busca dicionário de origem.
   */
  async fetchOrigemDictionary(): Promise<any[]> {
    const endpoint = `/porto/dictionaries/origem`;
    return this.fetchData<any[]>(endpoint);
  }

  /**
   * Busca dicionário de destino.
   */
  async fetchDestinoDictionary(): Promise<any[]> {
    const endpoint = `/porto/dictionaries/destino`;
    return this.fetchData<any[]>(endpoint);
  }

  /**
   * Busca dicionário de mercadoria.
   */
  async fetchMercadoriaDictionary(): Promise<any[]> {
    const endpoint = `/porto/dictionaries/mercadoria`;
    return this.fetchData<any[]>(endpoint);
  }

  async fetchCoordinates(): Promise<any[]> {
    const endpoint= `/porto/charts/coords/${this.year}`
    return this.fetchData<any[]>(endpoint);
  }

  async fetchPortosOperations(): Promise<any[]> {
    const endpoint= `/porto/charts/coords/${this.year}`
    return this.fetchData<any[]>(endpoint);
  }
  
}