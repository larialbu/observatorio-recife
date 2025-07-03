import { EmpresasData } from "@/@api/http/to-charts/empresas/EmpresasData";
import { applyGenericFilters } from "@/utils/filters/@features/applyGenericFilters";
import { applyHashedFilters } from "@/utils/filters/@features/applyHashedFilters";
import { gropoHash } from "@/utils/hashs/micro-caged/gropoHash";

export class EmpresasDataService {
  private static instance: EmpresasDataService;

  private currentYear: string = "2024";

  private dataCache: Record<string, any> = {};

  private constructor() {}

  public static getInstance(): EmpresasDataService {
    if (!EmpresasDataService.instance) {
      EmpresasDataService.instance = new EmpresasDataService();
    }
    return EmpresasDataService.instance;
  }

  public setYear(year: string) {
    this.currentYear = year;
  }

  private getCacheKey(tab: string, filters: Record<string, any>): string {
    return `${tab}-${this.currentYear}-${JSON.stringify(filters.additionalFilters)}`;
  }

  // tab1   
  private async fetchGeral(filters: any) {
    const empresasData = new EmpresasData(this.currentYear);

    const fetchData = await empresasData.fetchProcessedEmpresasAtivasRecife() 

    const filteredData = applyGenericFilters(fetchData, filters);

    return {
      empresas: filteredData,
      id: "empresas-empresas-ativas-recife",
    };
  }

  // tab2   
  private async fetchEmpresasAtivas(filters: any) {
    const empresasData = new EmpresasData(this.currentYear);

    const fetchData = await empresasData.fetchProcessedEmpresasAtivas() 

    const filteredData = applyGenericFilters(fetchData, filters);

    return {
      empresas: filteredData,
      id: "empresas-empresas-ativas",
    };
  }

  // tab3   
  private async fetchEmpresasInativas(filters: any) {
    const empresasData = new EmpresasData(this.currentYear);

    const fetchData = await empresasData.fetchProcessedEmpresasInativas() 

    const filteredData = applyGenericFilters(fetchData, filters);

    return {
      empresas: filteredData,
      id: "empresas-empresas-inativas",
    };
  }

  // tab4   
  private async fetchEmpresasAtivasInativas(filters: any) {
    const empresasData = new EmpresasData(this.currentYear);

    const fetchDataAtivas = await empresasData.fetchProcessedEmpresasAtivas() 
    const fetchDataInativas = await empresasData.fetchProcessedEmpresasInativas() 

    const filteredDataAtivas = applyGenericFilters(fetchDataAtivas, filters);
    const filteredDataInativas = applyGenericFilters(fetchDataInativas, filters);

    return {
      empresas: {
        ativas: filteredDataAtivas,
        inativas: filteredDataInativas
      },
      id: "empresas-empresas-ativas-inativas",
    };
  }

  // tab5
    private async fetchEmpresasNaturezas(filters: any) {
    const empresasData = new EmpresasData(this.currentYear);

    const fetchData = await empresasData.fetchProcessedNaturezas() 

    const filteredData = applyGenericFilters(fetchData, filters);

    console.log('empresas-empresas-naturezas', {
      empresas: filteredData,
      id: "empresas-empresas-naturezas",
    })

    return {
      empresas: filteredData,
      id: "empresas-empresas-naturezas",
    };
  }

//   private async fetchGeral(filters: any) {
//     const filtersHashed = applyHashedFilters(filters, 'grupamento', 'seção', gropoHash)

//     const empresasData = new EmpresasDataService(this.currentYear);

//     const fetchData = await empresasData.fetchProcessedDataMicroCaged() 

//     const filteredData = applyGenericFilters(fetchData, filtersHashed, ['grupamento']);

//     return {
//       microCaged: filteredData,
//       id: "empregos-micro-caged",
//     };
//   }

//   private async fetchMedia(filters: any) {
//     const empresasData = new EmpresasDataService(this.currentYear);
//     const pastYear = `${+this.currentYear - 1}`

//     const [microCagedCur, microCagedPast] = await Promise.all([empresasData.fetchProcessedDataMicroCaged(), new EmpresasDataService(pastYear).fetchProcessedDataMicroCaged().catch(() => [])])

//     const filteredDataCur = applyGenericFilters(microCagedCur, filters)
//     const filteredDataPast = applyGenericFilters(microCagedPast, filters)

//     return {
//       microCaged: {
//         current: filteredDataCur,
//         past: filteredDataPast
//       },
//       id: "empregos-micro-caged-media",
//     };
//   }


  public async fetchDataForTab(tab: string, filters: Record<string, any>): Promise<any> {
    console.log('Tab ->', tab, tab === 'geral', filters)
    const cacheKey = this.getCacheKey(tab, filters);

    if (this.dataCache[cacheKey]) {
      return this.dataCache[cacheKey];
    }

    let data;
    if (tab === "geral") {
      data = await this.fetchGeral(filters);
    } else if (tab === "empresas-ativas") {
      data = await this.fetchEmpresasAtivas(filters);
    } else if (tab === "empresas-inativas") {
      data = await this.fetchEmpresasInativas(filters);
    } else if (tab === "empresas-ativas-inativas") {
      data = await this.fetchEmpresasAtivasInativas(filters);
    } else if (tab === "empresas-naturezas") {
      data = await this.fetchEmpresasNaturezas(filters);
    } else if (tab === "empresas-classes") {
      data = await this.fetchEmpresasNaturezas(filters);
    } else {
      data = await this.fetchGeral(filters);
    }

    this.dataCache[cacheKey] = data;
    return data;
  }

  public clearCache() {
    this.dataCache = {};
  }
}

export const empresasDataService = EmpresasDataService.getInstance();
