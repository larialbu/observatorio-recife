import { PibData } from "@/@api/http/to-charts/pib/PibData";
import { applyGenericFilters } from "@/utils/filters/@features/applyGenericFilters";

export class PibDataService {
  private static instance: PibDataService;
  private currentYear: string = "2021"; // Ano padrão
  private dataCache: Record<string, any> = {};

  private constructor() {}

  /**
   * Retorna a instância singleton do serviço.
   */
  public static getInstance(): PibDataService {
    if (!PibDataService.instance) {
      PibDataService.instance = new PibDataService();
    }
    return PibDataService.instance;
  }

  /**
   * Define o ano atual para buscar dados.
   */
  public setYear(year: string): void {
    const validYears = Array.from({ length: 2021 - 2010 + 1 }, (_, i) => (2010 + i).toString());
    if (!validYears.includes(year)) {
      throw new Error(`Ano inválido: ${year}. Os dados de PIB estão disponíveis apenas entre 2010 e 2021.`);
    }
    this.currentYear = year;
  }

  /**
   * Gera uma chave única para o cache com base na aba e filtros.
   */
  private getCacheKey(tab: string, filters: Record<string, any>): string {
    return `${tab}-${this.currentYear}-${JSON.stringify(filters.additionalFilters || {})}`;
  }

  /**
   * Busca os dados brutos do PIB para o ano especificado.
   */
  private async fetchPibData(filters: Record<string, any>) {
    const pibService = new PibData(this.currentYear);
    try {
      // Busca os dados brutos
      const rawData = await pibService.fetchRawData();

      // Aplica filtros genéricos, se necessário
      const filteredData = applyGenericFilters(rawData, filters);

      console.log("Dados filtrados do PIB:", filteredData);

      return {
        geral: filteredData,
        rawData: rawData, // Armazena os dados brutos para uso posterior
      };
    } catch (error: unknown) {
      console.error(`Erro ao buscar dados do PIB para o ano ${this.currentYear}:`, error);
      throw error;
    }
  }

  /**
   * Busca dados para uma aba específica (ex.: "geral").
   */
  public async fetchDataForTab(tab: string, filters: Record<string, any> = {}): Promise<any> {
    const cacheKey = this.getCacheKey(tab, filters);

    // Verifica se os dados já estão no cache
    if (this.dataCache[cacheKey]) {
      console.log("Usando dados em cache para:", cacheKey);
      return this.dataCache[cacheKey];
    }

    let data;
    try {
      if (tab === "geral") {
        data = await this.fetchPibData(filters);
      } else if (tab === "per_capita") {
        data = await this.fetchPibData(filters);
      } else {
        throw new Error(`Aba desconhecida: ${tab}`);
      }

      // Armazena os dados no cache
      this.dataCache[cacheKey] = data;
    } catch (error: unknown) {
      console.error(`Erro ao buscar dados para a aba "${tab}":`, error);
      throw error;
    }

    return data;
  }

  /**
   * Busca dados de todos os anos (2010–2021).
   */
  public async fetchAllYearsData(tab: string, filters: Record<string, any> = {}): Promise<Record<string, any>> {
    const allYearsData: Record<string, any> = {};
    const validYears = Array.from({ length: 2021 - 2010 + 1 }, (_, i) => 2010 + i);

    for (const year of validYears) {
      try {
        // Define o ano atual
        this.setYear(year.toString());

        // Busca os dados para a aba especificada
        const data = await this.fetchDataForTab(tab, filters);

        // Armazena os dados no objeto `allYearsData`
        allYearsData[year] = data;

        // Exibe os dados de Recife para os anos 2020 e 2021
        if (year === 2020 || year === 2021) {
          const recifeData = data.geral.find(
            (item: any) => item["Município - UF"] === "Recife - PE"
          );
          console.log(`PIB de Recife para o ano ${year}:`, recifeData);
        }
      } catch (error: unknown) {
        console.error(`Erro ao buscar dados para o ano ${year}:`, error);
      }
    }

    console.log("Dados de todos os anos:", allYearsData);
    return allYearsData;
  }

  /**
   * Limpa o cache de dados.
   */
  public clearCache(): void {
    this.dataCache = {};
    console.log("Cache de dados limpo.");
  }
}

// Exporta a instância singleton do serviço
export const pibDataService = PibDataService.getInstance();