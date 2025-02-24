/**
 * ESTA PÁGINA NÃO DEVE ARMAZENAR CACHE PELO TAMANHO DE DATA RECEBID
 */

import { parquetRead } from "hyparquet";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_USERNAME = process.env.NEXT_PUBLIC_API_USERNAME;
const API_PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD;

export class PortoData {
  private year: string;

  constructor(year: string) {
    this.year = year;
  }

  /**
   * Método genérico para buscar dados da API.
   */
  private async fetchData<T>(endpoint: string): Promise<T> {

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

      // Log do cabeçalho Content-Type
      const contentType = response.headers.get("content-type");

      let data: any;

       if (contentType?.includes("application/octet-stream")) {
        const startTime = performance.now();

        const arrayBuffer = await response.arrayBuffer();
        
        const records = await new Promise((resolve, reject) => {
          parquetRead({
            file: arrayBuffer,
            rowFormat: 'object',
            onComplete: (data) => resolve(data),
          });
        });

        console.log('RECCORDS OBJECT FORMAT', records)
        
        const endTime = performance.now();
        console.log(`Tempo de execução: ${(endTime - startTime).toFixed(2)} ms`);
      

       data = records;
      } else {
        // Caso contrário, trata como JSON normal
        const text = await response.text(); // Lê a resposta como texto para depuração
        data = JSON.parse(text); // Converte para objeto JSON
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
    const endpoint = `/porto/carga/${this.year}`;
    return this.fetchData<any[]>(endpoint);
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