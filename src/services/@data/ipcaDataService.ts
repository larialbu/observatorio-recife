import { IpcaData } from "@/@api/http/to-charts/ipca/IPCAData";
import { applyGenericFilters } from "@/utils/filters/@features/applyGenericFilters";

export class IpcaDataService {
  private static instance: IpcaDataService;
  private currentYear: string = "2024";
  private dataCache: Record<string, any> = {};

  private constructor() {}

  public static getInstance(): IpcaDataService {
    if (!IpcaDataService.instance) {
      IpcaDataService.instance = new IpcaDataService();
    }
    return IpcaDataService.instance;
  }

  public setYear(year: string) {
    this.currentYear = year;
  }

  private getCacheKey(tab: string, filters: Record<string, any>): string {
    return `${tab}-${this.currentYear}-${JSON.stringify(filters.additionalFilters)}`;
  }
  
  private async fetchIpcaGeralData(filters: Record<string, any>) {
    const ipcaService = new IpcaData(this.currentYear);
    const geral = await ipcaService.fetchProcessedGeralData();
    console.log('aaaaaaGeral')
    const geralFiltered = applyGenericFilters(geral, filters);
    console.log(geralFiltered);

    return { geral: geralFiltered };
  }

  private async fetchIpcaGruposData(filters: Record<string, any>) {
    const ipcaService = new IpcaData(this.currentYear);
    const grupos = await ipcaService.fetchProcessedGruposData();
    console.log('aaaaaagrup')
    const gruposFiltered = applyGenericFilters(grupos, filters);
    console.log(gruposFiltered);

    return { grupos: gruposFiltered };
  }

  private async fetchIpcaTabelasData(filters: Record<string, any>) {
    const ipcaService = new IpcaData(this.currentYear);
    const tabelas = await ipcaService.fetchProcessedTabelasData();
    const tabelasFiltered = applyGenericFilters(tabelas, filters);
    console.log(tabelasFiltered);

    return { tabelas: tabelasFiltered };
  }

  public async fetchDataForTab(tab: string, filters: Record<string, any>) {
    // Agora usamos getCacheKey que recebe (tab, filters)
    const cacheKey = this.getCacheKey(tab, filters);
  
    // Se já existe no cache com as mesmas seleções:
    if (this.dataCache[cacheKey]) {
      return this.dataCache[cacheKey];
    }
  
    let data;
    if (tab === "analitico") {
      data = await this.fetchIpcaTabelasData(filters);
    } else if (tab === 'grupos') {
      data = await this.fetchIpcaGruposData(filters);
    } else {
      data = await this.fetchIpcaGeralData(filters);
    }
  
    this.dataCache[cacheKey] = data;
    return data;
  }
}

export const ipcaDataService = IpcaDataService.getInstance();
