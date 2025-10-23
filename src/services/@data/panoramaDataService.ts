import { PanoramaData } from "@/@api/http/to-charts/panorama/PanoramaData";
import { AeroportoDataResult, AnacAeroportoData } from "@/@types/observatorio/@data/aeroportoData";
import { Filters, Service } from "@/@types/observatorio/shared";
import { getRawData } from "@/utils/filters/@data/getRawData";
import { applyGenericFilters } from "@/utils/filters/@features/applyGenericFilters";

export class PanoramaDataService implements Service<AeroportoDataResult> {
  private static instance: PanoramaDataService;
  private currentYear: string = "2024";
  private dataCache: Record<string, AeroportoDataResult> = {};

  private constructor() {}

  public static getInstance(): PanoramaDataService {
    if (!PanoramaDataService.instance) {
      PanoramaDataService.instance = new PanoramaDataService();
    }
    return PanoramaDataService.instance;
  }

  public setYear(year: string) {
    this.currentYear = year;
  }

  private getCacheKey(tab: string, filters: Filters): string {
    return `${tab}-${this.currentYear}-${JSON.stringify(filters.additionalFilters)}`;
  }
  

  private async fetchGeralData(filters: Filters) {
    const panoramaService = new PanoramaData('2024');
    const years = filters.years as any; // Lista de anos a serem buscados
   
    const anac = (await panoramaService.fetchProcessedDataAnac()).filter(item => item['AEROPORTO NOME'] === 'Recife');
    const pib = (await panoramaService.fetchProcessedDataPib()).filter((item) => item['Nome da Grande Região'] === 'Nordeste');
    const balanca = (await panoramaService.fetchProcessedDataBalanca()).filter(item => item['Município'] === 'Recife - PE');
    const empresas = await panoramaService.fetchProcessedEmpresasAtivas();
    const rankingPromises = years.map((year: any) => {
      const rankingService = new PanoramaData(year);
      return rankingService.fetchProcessedGeralDataRanking().then((data) => {
        return data; // Organiza os dados por ano
      });
    });
  
    const ranking = (await Promise.all(rankingPromises)).flat().filter(item => item['Município'] === 'Recife');


    const caged = (await panoramaService.fetchProcessedDataCaged()).filter(item => item['Municipio'] === 'Recife-PE');
    const ipca = (await panoramaService.fetchProcessedGeralDataIpca()).filter(item => item['Capital'] === 'Recife');
 
    return { 
      data: { anac, pib, balanca, empresas, caged, ipca, ranking },
      id: 'panorama' 
    } as any;
    // } as AnacAeroportoData;
  }

  public async fetchDataForTab(tab: string, filters: Filters) {
    // Agora usamos getCacheKey que recebe (tab, filters)
    const cacheKey = this.getCacheKey(tab, filters);
  
    // Se já existe no cache com as mesmas seleções:
    if (this.dataCache[cacheKey]) {
      return this.dataCache[cacheKey];
    }
  
    let data;

    data = await this.fetchGeralData(filters);
  
    this.dataCache[cacheKey] = data;
    return data;
  }
}

export const panoramaDataService = PanoramaDataService.getInstance();
