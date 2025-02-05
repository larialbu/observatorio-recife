import pako from "pako";
import { parquetRead } from "hyparquet";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_USERNAME = process.env.NEXT_PUBLIC_API_USERNAME;
const API_PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD;

export class PortoData {
  private year: string;
  private static cache: Record<string, any> = {}; // Cache estático para todas as instâncias

  constructor(year: string) {
    this.year = year;
  }

  /**
   * Método genérico para buscar dados da API.
   */
  private async fetchData<T>(endpoint: string): Promise<T> {
    if (PortoData.cache[endpoint]) {
      // console.log("Usando dados em cache para:", endpoint);
      return PortoData.cache[endpoint];
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

      // Log do cabeçalho Content-Type
      const contentType = response.headers.get("content-type");
      // console.log(`Content-Type recebido: ${contentType}`);

      let data: T;

      if (contentType?.includes("application/gzip")) {
        // Se for .gz, descompacta os dados
        const arrayBuffer = await response.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        // Log do conteúdo bruto (primeiros bytes)
        // console.log("Primeiros 100 bytes recebidos:", uint8Array.slice(0, 100));

        const decompressedData = pako.inflate(uint8Array, { to: "string" });
        // console.log("Dados descompactados:", decompressedData); // Log dos dados descompactados

        data = JSON.parse(decompressedData); // Converte o JSON descompactado para objeto
      } else if (contentType?.includes("application/octet-stream")) {
          const arrayBuffer = await response.arrayBuffer();
          
          const records = await new Promise<any[]>((resolve, reject) => {
            parquetRead({
              file: arrayBuffer,
              onComplete: (data) => {
                resolve(data);
              },
            });
          });

       data = records;
      } else {
        // Caso contrário, trata como JSON normal
        const text = await response.text(); // Lê a resposta como texto para depuração
        // console.log("Resposta bruta (JSON):", text); // Log da resposta bruta
        data = JSON.parse(text); // Converte para objeto JSON
      }

      // console.log("Resposta JSON recebida:", data);
      PortoData.cache[endpoint] = data;
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

  /**
   * Limpa o cache de dados.
   */
  clearCache(): void {
    PortoData.cache = {};
  }
}