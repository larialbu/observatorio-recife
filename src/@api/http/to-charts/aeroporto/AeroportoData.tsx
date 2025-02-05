import { ProcessedAenaCargasData } from "@/@types/observatorio/aeroporto/processedAenaCargasData";
import { ProcessedAenaPassageirosData } from "@/@types/observatorio/aeroporto/processedAenaPassageirosData";
import { ProcessedData } from "@/@types/observatorio/aeroporto/processedData";

// Importação dinâmica do hyparquet
import { parquetRead, asyncBufferFromFile, asyncBufferFromUrl } from "hyparquet";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_USERNAME = process.env.NEXT_PUBLIC_API_USERNAME;
const API_PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD;

export class AeroportoData {
  private year: string;
  private static cache: Record<string, any> = {}; // Cache estático para todas as instâncias

  constructor(year: string) {
    this.year = year;
  }

  // Função para inicializar já de início
  public async initialize() {

    //URL de teste
    const parquetUrl = `http://localhost:8080/api/v1/porto/carga/2023_test`;

    try {


        const data = await this.fetchAndReadParquet(parquetUrl);
        
        console.log('Parquet data:', data);
        
        console.log('Processamento Parquet: 1778ms - timer encerrado');
    } catch (error) {
        console.error('Erro ao executar a leitura de dados:', error);
    }
  }

  private async fetchAndReadParquet(url: string) {
    try {

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/octet-stream',
          'Authorization': `Basic ${btoa(`${API_USERNAME}:${API_PASSWORD}`)}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro para encontrar o .parquet: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      
      const records = await new Promise<any[]>((resolve, reject) => {
        parquetRead({
          file: arrayBuffer,
          onComplete: (data) => {
            resolve(data);
          },
        });
      });

      return records;
    } catch (error) {
      console.error('Erro ao processar o .parquet:', error);
      throw error;
    }
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

  // Função para buscar os dados de .parquet e integrar com a API
  async fetchDataWithParquet(parquetUrl: string) {
    // Tentar obter dados via API

    // Tentar obter dados via arquivo .parquet
    const dataFromParquet = await this.fetchAndReadParquet(parquetUrl);

    // Integrar dados da API com os dados do parquet (aqui você pode fazer a lógica de mesclagem conforme necessário)
    const mergedData = {
      dataFromParquet
    };

    return mergedData;
  }

  clearCache(): void {
    AeroportoData.cache = {};
  }
}

// Para executar imediatamente após a criação da instância
const aeroportoData = new AeroportoData("2024"); // Substitua com o ano desejado
aeroportoData.initialize();  // Chama o método para iniciar a execução
