import { BalancaComercialData } from "@/@api/http/to-charts/bal_comercial/BalancaComercialData";
import { Filters } from "@/@types/observatorio/shared";
import { applyGenericFilters } from "@/utils/filters/@features/applyGenericFilters";

export class BalancaDataService {
  private static instance: BalancaDataService;

  private currentYear: string = "2024";

  private dataCache: Record<string, any> = {};

  private constructor() {}

  public static getInstance(): BalancaDataService {
    if (!BalancaDataService.instance) {
      BalancaDataService.instance = new BalancaDataService();
    }
    return BalancaDataService.instance;
  }

  public setYear(year: string) {
    this.currentYear = year;
  }

  private getCacheKey(tab: string, filters: Filters): string {
    return `${tab}-${this.currentYear}-${JSON.stringify(filters.additionalFilters)}`;
  }


  private async fetchGeralData(filters: Filters) {
    const balancaService = new BalancaComercialData(this.currentYear);

    const raw = await balancaService.fetchProcessedData();

    const filtered = applyGenericFilters(raw, filters);

    // Retornamos no formato que quisermos
    return {
      geral: filtered,
      id: "balanca",
      // Se quiser "filteredData" + "additionalFiltersOptions", ajustamos a estrutura
      // Exemplo:
      // geral: filtered.filteredData,
      // additionalFiltersOptions: filtered.additionalFiltersOptions,
    };
  }

  /**
   * "Fetch Data" para tabs, se quiser: "geral", "analitico", etc.
   * Ajuste a lógica conforme as abas/rotas do projeto.
   */
  public async fetchDataForTab(tab: string, filters: Filters): Promise<any> {
    // Montamos a key para o cache
    const cacheKey = this.getCacheKey(tab, filters);

    // Se existir no cache, retornamos
    if (this.dataCache[cacheKey]) {
      return this.dataCache[cacheKey];
    }

    // Por exemplo, se "tab" for "geral" ou "analitico", podemos
    // fazer a mesma chamada, ou diferentes, depende do seu backend.
    // Aqui supomos que "fetchGeralData" serve para ambos,
    // mas você poderia ter "fetchAnaliticoData", etc.
    let data;
    if (tab === "analitico") {
      // Se quiser, chamar outro endpoint
      data = await this.fetchGeralData(filters);
    } else {
      // Por padrão, chama "geral"
      data = await this.fetchGeralData(filters);
    }

    // Guarda em cache antes de retornar
    this.dataCache[cacheKey] = data;
    return data;
  }

  /**
   * Se quiser limpar o cache em algum momento,
   * podemos expor este método.
   */
  public clearCache() {
    this.dataCache = {};
  }
}

export const balancaDataService = BalancaDataService.getInstance();
