import { RaisData } from "@/@api/http/to-charts/rais/RaisData";
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

  private async fetchGeral(filters: Record<string, any>) {
    const raisData = new RaisData(this.currentYear);
    // const pastYear = `${+this.currentYear - 1}`;

    const filterAtiv = (val: '1' | '0') => {
      return {...filters, additionalFilters: [...filters.additionalFilters, {
      label: "Vínculo Ativo 31/12",  
      options: [], 
      selected: [val],
    }] }}
    
    const fetchData = await raisData.fetchProcessedDataRais() 

    const filteredDataAtiv = applyGenericFilters(fetchData, filterAtiv('1'));
    const filteredDataNoAtiv = applyGenericFilters(fetchData, filterAtiv('0'));

    return {
        rais: {
          ativ: filteredDataAtiv,
          noAtiv: filteredDataNoAtiv
        },
        id: "empregos-rais"
    };
  }


  public async fetchDataForTab(tab: string, filters: Record<string, any>): Promise<any> {
    const cacheKey = this.getCacheKey(tab, filters);

    if (this.dataCache[cacheKey]) {
      return this.dataCache[cacheKey];
    }

    let data;
    if (tab === "rais") {
      data = await this.fetchGeral(filters);
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

export const raisDataService = EmpregosDataService.getInstance();
