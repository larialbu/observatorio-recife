import { PortoData } from "@/@api/http/to-charts/porto/PortoData";
import { PortoGeralData, PortoDataResult, PortoPassageirosData, PortoPassageirosResult } from "@/@types/observatorio/@data/portoData";
import { Filters } from "@/@types/observatorio/shared";
import { applyGenericFilters } from "@/utils/filters/@features/applyGenericFilters";

export class PortoDataService {
  private static instance: PortoDataService;
  private currentYear: string = "2024";
  private dataCache: Record<string, PortoDataResult> = {};

  private constructor() {}

  public static getInstance(): PortoDataService {
    if (!PortoDataService.instance) {
      PortoDataService.instance = new PortoDataService();
    }
    return PortoDataService.instance;
  }

  public setYear(year: string) {
    this.currentYear = year;
  }

  private getCacheKey(tab: string, filters: Filters): string {
    return `${tab}-${this.currentYear}-${JSON.stringify(filters)}`;
  }

  private async fetchPortoData(filters: Filters) {
    try {
      const portoData = new PortoData(this.currentYear);
      const pastYear = `${+this.currentYear - 1}`;

      const [
        atracacao,
        carga,
        origemDictionary,
        destinoDictionary,
        mercadoriaDictionary,
        coords,
        coordsPast,
      ] = await Promise.all([
        portoData.fetchAtracacaoPorAno(),
        portoData.fetchCargaPorAno(),
        portoData.fetchOrigemDictionary(),
        portoData.fetchDestinoDictionary(),
        portoData.fetchMercadoriaDictionary(),
        portoData.fetchCoordinates(),
        new PortoData(pastYear).fetchCoordinates().catch(() => []),
      ]);

      const atracacaoFiltered = applyGenericFilters(atracacao, filters);
      const atracacaoIds = new Set(atracacaoFiltered.filteredData.map((atracacao) => atracacao.IDAtracacao));

      const cargaFiltered = carga.filter(
        (item) => atracacaoIds.has(item.IDAtracacao) && item['FlagMCOperacaoCarga']
      );

      const portosSelected = filters?.additionalFilters.find((item) => item.label === "Porto Atracação")?.selected ?? [];
      
      return {
        atracacao: atracacaoFiltered,
        carga: cargaFiltered,
        rawData: { atracacao, carga },
        dictionaries: {
          origem: origemDictionary,
          destino: destinoDictionary,
          mercado: mercadoriaDictionary,
        },
        coords: [
          coords,
          (filters.additionalFilters.find((item) => item.label === "Mes")?.selected ?? []).map(Number)
        ],
        charts: {
          months: {
            past: [pastYear, coordsPast.filter((coord) => portosSelected?.includes(coord['Porto Atracação']))],
            current: [this.currentYear, coords.filter((coord) => portosSelected?.includes(coord['Porto Atracação']))] 
          }
        }, 
        id: "porto"
      } as PortoGeralData;
    } catch (error) {
      console.error("Erro ao buscar dados de porto:", error);
      throw error;
    }
  }

  private async fetchPortoPassageirosData(filters: Filters) {
    const pastYear = `${+this.currentYear - 1}`;
    const [passageirosCur, passageirosPast] = await Promise.allSettled([
      new PortoData(this.currentYear).fetchPassageirosPorAno(),
      new PortoData(pastYear).fetchPassageirosPorAno().catch(() => []),
    ]);

    const passageirosCurFiltered = applyGenericFilters(passageirosCur.status === 'fulfilled' ? passageirosCur.value : [], filters);
    const passageirosPastFiltered = applyGenericFilters(passageirosPast.status === 'fulfilled' ? passageirosPast.value : [], filters);

    return {
      passageiros: { 
        current: passageirosCurFiltered, 
        past: passageirosPastFiltered 
      }, 
      id: "porto-passageiros"
    } as PortoPassageirosResult;
  }

  public async fetchDataForTab(tab: string, filters: Filters) {
    const cacheKey = this.getCacheKey(tab, filters);

    if (this.dataCache[cacheKey]) {
      return this.dataCache[cacheKey];
    }

    let data;
    if (tab === "passageiro") {
      data = await this.fetchPortoPassageirosData(filters);
    } else {
      data = await this.fetchPortoData(filters);
    }

    this.dataCache[cacheKey] = data;
    return data;
  }
}


export const portoDataService = PortoDataService.getInstance();
