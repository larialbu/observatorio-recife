import { Service } from "@/@types/observatorio/shared";
import { Filters } from "@/@types/observatorio/shared";

type CombustiveisDataResult = {
  id: string;
  geral?: any;
  comparativo?: any;
  regional?: any;
  estadual?: any;
  municipal?: any;
};

export class CombustiveisDataService implements Service<CombustiveisDataResult> {
  private static instance: CombustiveisDataService;
  private currentYear: string = "2024";
  private dataCache: Record<string, CombustiveisDataResult> = {};

  private constructor() {}

  public static getInstance(): CombustiveisDataService {
    if (!CombustiveisDataService.instance) {
      CombustiveisDataService.instance = new CombustiveisDataService();
    }

    return CombustiveisDataService.instance;
  }

  public setYear(year: string) {
    this.currentYear = year;
  }

  private getCacheKey(tab: string, filters: Filters): string {
    return `${tab}-${this.currentYear}-${JSON.stringify(filters)}`;
  }

  private async fetchFromBackend(endpoint: string, filters: Filters) {
    const baseUrl = process.env.PUBLIC_API_BASE_URL;

    const params = new URLSearchParams();

    params.set("year", this.currentYear);

    Object.entries(filters || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });

    const response = await fetch(
      `${baseUrl}/combustiveis/${endpoint}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados de combustíveis: ${endpoint}`);
    }

    return response.json();
  }

  private async fetchGeralData(
    filters: Filters
  ): Promise<CombustiveisDataResult> {
    const geral = await this.fetchFromBackend("geral", filters);

    return {
      id: "combustiveis-geral",
      geral,
    };
  }

  private async fetchComparativoData(
    filters: Filters
  ): Promise<CombustiveisDataResult> {
    const comparativo = await this.fetchFromBackend("comparativo", filters);

    return {
      id: "combustiveis-comparativo",
      comparativo,
    };
  }

  private async fetchRegionalData(
    filters: Filters
  ): Promise<CombustiveisDataResult> {
    const regional = await this.fetchFromBackend("regional", filters);

    return {
      id: "combustiveis-regional",
      regional,
    };
  }

  private async fetchEstadualData(
    filters: Filters
  ): Promise<CombustiveisDataResult> {
    const estadual = await this.fetchFromBackend("estadual", filters);

    return {
      id: "combustiveis-estadual",
      estadual,
    };
  }

  private async fetchMunicipalData(
    filters: Filters
  ): Promise<CombustiveisDataResult> {
    const municipal = await this.fetchFromBackend("municipal", filters);

    return {
      id: "combustiveis-municipal",
      municipal,
    };
  }

  public async fetchDataForTab(
    tab: string,
    filters: Filters
  ): Promise<CombustiveisDataResult> {
    const cacheKey = this.getCacheKey(tab, filters);

    if (this.dataCache[cacheKey]) {
      return this.dataCache[cacheKey];
    }

    let data: CombustiveisDataResult;

    if (tab === "comparativo") {
      data = await this.fetchComparativoData(filters);
    } else if (tab === "regional") {
      data = await this.fetchRegionalData(filters);
    } else if (tab === "estadual") {
      data = await this.fetchEstadualData(filters);
    } else if (tab === "municipal") {
      data = await this.fetchMunicipalData(filters);
    } else {
      data = await this.fetchGeralData(filters);
    }

    this.dataCache[cacheKey] = data;

    return data;
  }
}

export const combustiveisDataService = CombustiveisDataService.getInstance();