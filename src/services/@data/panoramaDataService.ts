import { PanoramaData } from "@/@api/http/to-charts/panorama/PanoramaData";
import { AeroportoDataResult } from "@/@types/observatorio/@data/aeroportoData";
import { Filters, Service } from "@/@types/observatorio/shared";

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
 
  
  private async fetchWithFallback<T>(
    fetchFn: (service: PanoramaData) => Promise<T[]>,
    startYear: number,
    minYear = 2018
  ): Promise<T[]> {
    let year = startYear;

    while (year >= minYear) {
      try {
        const svc = new PanoramaData(String(year));
        const data = await fetchFn(svc);

        if (Array.isArray(data) && data.length > 0) {
          console.warn(`✅ Dados encontrados para o ano ${year}`);
          return data;
        } else {
          console.warn(`⚠️ Ano ${year} existe mas sem dados. Tentando ${year - 1}...`);
        }
      } catch (err) {
        console.warn(`❌ Erro ao buscar ano ${year}. Tentando ${year - 1}...`, err);
      }

      year--;
    }

    console.warn(`❌ Nenhum dado encontrado até o ano mínimo (${minYear}). Retornando [].`);
    return [];
  }


  private async fetchGeralData(filters: Filters) {
    const startYear = Number(this.currentYear);
    const years = filters.years as any;

    const anac = (await this.fetchWithFallback(
      (svc) => svc.fetchProcessedDataAnac(),
      startYear
    )).filter(item => item['AEROPORTO NOME'] === 'Recife');

    console.log('Anac data fetched for years', years, anac);

    const pib = (await this.fetchWithFallback(
      (svc) => svc.fetchProcessedDataPib(),
      startYear
    )).filter(item => item['Nome da Grande Região'] === 'Nordeste');

    console.log('PIB data fetched for years', years, pib);

    const balanca = (await this.fetchWithFallback(
      (svc) => svc.fetchProcessedDataBalanca(),
      startYear
    )).filter(item => item['Município'] === 'Recife - PE');

    console.log('Balança data fetched for years', years, balanca);

    const ipca = (await this.fetchWithFallback(
      (svc) => svc.fetchProcessedGeralDataIpca(),
      startYear
    )).filter(item => item['Capital'] === 'Recife');

    console.log('IPCA data fetched for years', years, ipca);


    const empresas = await this.fetchWithFallback(
      (svc) => svc.fetchProcessedEmpresasAtivas(),
      startYear
    );

    console.log('Empresas data fetched for years', years, empresas);

    const rankingPromises = years.map(async (year: any) => {
      const svc = new PanoramaData(year);
      return svc.fetchProcessedGeralDataRanking();
    });

    const ranking = (await Promise.all(rankingPromises))
      .flat()
      .filter(item => item['Município'] === 'Recife');

    console.log('Ranking data fetched for years', years, ranking);  

    const caged = (await this.fetchWithFallback(
      (svc) => svc.fetchProcessedDataCaged(),
      startYear
    )).filter(item => item['Municipio'] === 'Recife-PE');

    console.log('CAGED data fetched for years', years, caged);

    console.log('Isso é para funcionar ->', {anac, pib, balanca, empresas, caged, ipca, ranking});

    return {
      data: { anac, pib, balanca, empresas, caged, ipca, ranking },
      id: 'panorama'
    } as any;
  }

  public async fetchDataForTab(tab: string, filters: Filters) {
    const cacheKey = this.getCacheKey(tab, filters);

    if (this.dataCache[cacheKey]) {
      return this.dataCache[cacheKey];
    }

    const data = await this.fetchGeralData(filters);

    this.dataCache[cacheKey] = data;
    return data;
  }
}

export const panoramaDataService = PanoramaDataService.getInstance();
