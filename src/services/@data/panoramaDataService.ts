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
    console.log('FOI ESSE AQUI QUE RODOU!')
    const panoramaService = new PanoramaData('2024');
    // const panoramaService = new AeroportoData(this.currentYear);
    const anac = (await panoramaService.fetchProcessedDataAnac()).filter(item => item['AEROPORTO NOME'] === 'Recife');
    const rawData = await getRawData({applyGenericFilters, service: panoramaService, nameFunc:'fetchProcessedDataAnac', currentYear: this.currentYear, years: filters.years, keyName: 'AEROPORTO NOME', filters, lengthIgnore: 1})
    const anacFiltered = {...applyGenericFilters(anac, filters), rawData};

    const monthRawData = applyGenericFilters(anac, filters, ["MÊS"])
    const airportRawData = applyGenericFilters(anac, filters, ["AEROPORTO NOME"])

    console.log('anac', anac)
    const pib = (await panoramaService.fetchProcessedDataPib()).filter(item => item['Município - UF'] === 'Recife - PE');
    console.log('piv', pib)
    const balanca = (await panoramaService.fetchProcessedDataBalanca()).filter(item => item['Município'] === 'Recife - PE');
    console.log('balanca', balanca)
    const empresas = await panoramaService.fetchProcessedEmpresasAtivasRecife();
    console.log('empresas', empresas)
    const caged = (await panoramaService.fetchProcessedDataCaged()).filter(item => item['Municipio'] === 'Recife-PE');
    console.log('caged', caged)
    const ipca = (await panoramaService.fetchProcessedGeralDataIpca()).filter(item => item['Capital'] === 'Recife');
    console.log('ipca', ipca)


    console.log('FOI ESSE AQUI QUE RODOU!')

    // anac - AEROPORTO NOME - Recife
    // pib - Município - UF - Recife - PE
    // balanca - Município - Recife - PE
    // empresas - Municipio - Recife (não tem, se tiver vai ser esse)
    // caged - Municipio - Recife-PE
    // ipca - Capital - Recife 

    return { 
      anac: anac, 
    //   anac: anacFiltered, 
      data: { anac, pib, balanca, empresas, caged, ipca },
      rawData: {
        "MÊS": monthRawData,
        "AEROPORTO NOME": airportRawData
      },
      id: 'anac' 
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
