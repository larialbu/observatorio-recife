// PibData.ts
import { parquetRead } from "hyparquet";

// Variáveis de ambiente
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_USERNAME = process.env.NEXT_PUBLIC_API_USERNAME;
const API_PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD;

if (!BASE_URL || !API_USERNAME || !API_PASSWORD) {
  throw new Error(
    "Variáveis de ambiente NEXT_PUBLIC_API_BASE_URL, NEXT_PUBLIC_API_USERNAME ou NEXT_PUBLIC_API_PASSWORD não estão definidas."
  );
}

export class PibData {
  private year: string;
  private static cache: Record<string, any> = {}; // Cache estático para todas as instâncias

  constructor(year: string) {
    this.year = year;
  }

  /**
   * Método genérico para buscar dados da API.
   */
  private async fetchData<T>(endpoint: string): Promise<T> {
    const fullEndpoint = `${BASE_URL}${endpoint}`;
    if (PibData.cache[fullEndpoint]) {
      console.log("Usando dados em cache para:", fullEndpoint);
      return PibData.cache[fullEndpoint];
    }
    try {
      const response = await fetch(fullEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`${API_USERNAME}:${API_PASSWORD}`)}`, // Autenticação básica com usuário e senha
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar dados da API: ${fullEndpoint}`);
      }

      // Verifica o tipo de conteúdo retornado
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/octet-stream")) {
        throw new Error("Formato de arquivo não suportado. Esperado: application/octet-stream");
      }

      // Lê o arquivo Parquet
      const startTime = performance.now();
      const arrayBuffer = await response.arrayBuffer();

      // Usa try-catch para capturar erros durante a leitura do Parquet
      const records = await new Promise<T>((resolve, reject) => {
        try {
          parquetRead({
            file: arrayBuffer,
            rowFormat: "object",
            onComplete: (data) => resolve(data as T),
          });
        } catch (error) {
          console.error(`Erro ao ler o arquivo Parquet (${this.year}):`, error);
          reject(error);
        }
      });

      const endTime = performance.now();
      console.log(
        `Tempo de execução para leitura do Parquet (${this.year}): ${(endTime - startTime).toFixed(2)} ms`
      );

      // Armazena os dados no cache
      PibData.cache[fullEndpoint] = records;
      return records;
    } catch (error: unknown) {
      console.error(`Erro em fetchData (${fullEndpoint}):`, error);
      throw error;
    }
  }

  /**
   * Busca os dados brutos do PIB para o ano especificado.
   */
  async fetchRawData(): Promise<any[]> {
    const endpoint = `/pib/${this.year}`;
    const rawData = await this.fetchData<any[]>(endpoint);
    console.log(`Dados brutos do PIB para o ano ${this.year}:`, rawData);
    return rawData;
  }

  /**
   * Busca os dados brutos do PIB para todos os anos (2010–2021).
   */
  static async fetchAllYearsRawData(): Promise<Record<string, any[]>> {
    const allYearsData: Record<string, any[]> = {};
    const validYears = Array.from({ length: 2021 - 2010 + 1 }, (_, i) => 2010 + i);

    for (const year of validYears) {
      try {
        const pibDataInstance = new PibData(year.toString());
        const rawData = await pibDataInstance.fetchRawData();
        allYearsData[year] = rawData;
      } catch (error: unknown) {
        console.error(`Erro ao buscar dados para o ano ${year}:`, error);
      }
    }

    console.log("Dados brutos de todos os anos:", allYearsData);
    return allYearsData;
  }

  /**
   * Limpa o cache de dados.
   */
  static clearCache(): void {
    PibData.cache = {};
    console.log("Cache de dados limpo.");
  }
}