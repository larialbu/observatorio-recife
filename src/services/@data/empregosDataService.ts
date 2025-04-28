import { EmpregosData } from "@/@api/http/to-charts/empregos/EmpregosData";
import { applyGenericFilters } from "@/utils/filters/@features/applyGenericFilters";

export class EmpregosDataService {
  private static instance: EmpregosDataService;

  private currentYear: string = "2024";

  private dataCache: Record<string, any> = {};

  private constructor() {}

  public static getInstance(): EmpregosDataService {
    if (!EmpregosDataService.instance) {
      EmpregosDataService.instance = new EmpregosDataService();
    }
    return EmpregosDataService.instance;
  }

  public setYear(year: string) {
    this.currentYear = year;
  }

  private getCacheKey(tab: string, filters: Record<string, any>): string {
    return `${tab}-${this.currentYear}-${JSON.stringify(filters.additionalFilters)}`;
  }

  private async fetchGeralCaged(filters: Record<string, any>) {
    const empregosData = new EmpregosData(this.currentYear);
    // const pastYear = `${+this.currentYear - 1}`;

    const fetchData = await empregosData.fetchProcessedDataCaged();

    console.log('Desempregos Fetch: ', await empregosData.fetchProcessedDataCagedDesemprego())
    

    // tanto faz, o ideial é filtrar somente por municipio
    const filteredMunicipioData = applyGenericFilters(fetchData,  filters, ['Região', 'UF']);
    // tudo menos filtrar por municipio
    const filteredCagedData = applyGenericFilters(fetchData, filters, ['Municipio']);

    return {
        municipios: filteredMunicipioData,
        caged: filteredCagedData,
        id: "empregos-caged"
    };
  }

  private async fetchGeralCagedDesemprego(filters: Record<string, any>) {
    const empregosData = new EmpregosData(this.currentYear);
    const pastYear = `${+this.currentYear - 1}`;

    // const fetchData = await empregosData.fetchProcessedDataCagedDesemprego();

    const [
      empregosCur,
      empregosPast,
    ] = await Promise.all([
      empregosData.fetchProcessedDataCagedDesemprego(),
      new EmpregosData(pastYear).fetchProcessedDataCagedDesemprego().catch(() => []),
    ]);

    // console.log('Desempregos Fetch: ', await empregosData.fetchProcessedDataCagedDesemprego())
    
    // tanto faz, o ideial é filtrar somente por municipio
    const filteredMunicipioData = applyGenericFilters(empregosCur, filters, ['Região', 'Trimestre']);
    const filteredMunicipioPastData = applyGenericFilters(empregosPast, filters, ['Região', 'Trimestre'], ['Trimestre']);
    const filteredMunicipioTrimestreData = applyGenericFilters(empregosCur, filters, ['Região']);
    // tudo menos filtrar por municipio
    const filteredDesempregoData = applyGenericFilters(empregosCur, filters, ['Capital']);
    
    return {
        municipios: filteredMunicipioData,
        desemprego: filteredDesempregoData,
        trimestre: {
          municipiosTrimestre: filteredMunicipioTrimestreData,
          municipiosTrimestrePast: filteredMunicipioPastData,
        },
        id: "dempregos-caged"
    };
  }

  public async fetchDataForTab(tab: string, filters: Record<string, any>): Promise<any> {
    const cacheKey = this.getCacheKey(tab, filters);

    if (this.dataCache[cacheKey]) {
      return this.dataCache[cacheKey];
    }

    let data;
    if (tab === "desemprego") {
      data = await this.fetchGeralCagedDesemprego(filters);
    } else {
      data = await this.fetchGeralCaged(filters);
    }

    this.dataCache[cacheKey] = data;
    return data;
  }

  public clearCache() {
    this.dataCache = {};
  }
}

export const empregosDataService = EmpregosDataService.getInstance();
