import { PortoData } from "@/@api/http/to-charts/porto/PortoData";
import { applyGenericFilters } from "@/utils/filters/@features/applyGenericFilters";

export class PortoDataService {
  private static instance: PortoDataService;
  private currentYear: string = "2024";
  private portoServiceCache: PortoData;

  private constructor() {
    this.portoServiceCache = new PortoData(this.currentYear);
  }

  public static getInstance(): PortoDataService {
    if (!PortoDataService.instance) {
      PortoDataService.instance = new PortoDataService();
    }
    return PortoDataService.instance;
  }

  public setYear(year: string) {
    if (this.currentYear !== year) {
      this.currentYear = year;
      this.portoServiceCache.year = year;
    }
  }

  private async fetchPortoData(filters: Record<string, any>) {
    try {
      const [
        atracacao,
        carga,
        origemDictionary,
        destinoDictionary,
        mercadoriaDictionary,
        coords,
        portosOperations
      ] = await Promise.all([
        this.portoServiceCache.fetchAtracacaoPorAno(),
        this.portoServiceCache.fetchCargaPorAno(),
        this.portoServiceCache.fetchOrigemDictionary(),
        this.portoServiceCache.fetchDestinoDictionary(),
        this.portoServiceCache.fetchMercadoriaDictionary(),
        this.portoServiceCache.fetchCoordinates(),
        this.portoServiceCache.fetchPortosOperations(),
      ]);

      const atracacaoFiltered = applyGenericFilters(atracacao, filters);
      const atracacaoIds = new Set(atracacaoFiltered.filteredData.map((atracacao) => atracacao.IDAtracacao));

      const cargaFiltered = carga.filter(
        (item) => atracacaoIds.has(item.IDAtracacao) && item['FlagMCOperacaoCarga']
      );

      return {
        atracacao: atracacaoFiltered,
        carga: cargaFiltered,
        rawData: { atracacao, carga },
        dictionaries: {
          origem: origemDictionary,
          destino: destinoDictionary,
          mercado: mercadoriaDictionary,
        },
        coords,
        charts: { portos: portosOperations }
      };
    } catch (error) {
      console.error("Erro ao buscar dados de porto:", error);
      throw error;
    }
  }

  private async fetchPortoPassageirosData(filters: Record<string, any>) {
    try {
      const pastYear = `${+this.currentYear - 1}`;
      const [passageirosCur, passageirosPast] = await Promise.allSettled([
        this.portoServiceCache.fetchPassageirosPorAno(),
        new PortoData(pastYear).fetchPassageirosPorAno().catch(() => []),
      ]);

      const passageirosCurFiltered = applyGenericFilters(passageirosCur.status === 'fulfilled' ? passageirosCur.value : [], filters);
      const passageirosPastFiltered = applyGenericFilters(passageirosPast.status === 'fulfilled' ? passageirosPast.value : [], filters);

      return {
        passageiros: { current: passageirosCurFiltered, past: passageirosPastFiltered }
      };
    } catch (error) {
      console.error("Erro ao buscar dados de passageiros:", error);
      throw error;
    }
  }

  public async fetchDataForTab(tab: string, filters: Record<string, any>) {
    try {
      let data;
      if (tab === "passageiro") {
        data = await this.fetchPortoPassageirosData(filters);
      } else {
        data = await this.fetchPortoData(filters);
      }
      
      // Limpa o cache depois de pegar os dados
      this.clearCache();
  
      return data;
    } catch (error) {
      console.error("Erro ao buscar dados para a aba:", error);
      throw error;
    }
  }
  
  private clearCache() {
    this.portoServiceCache = new PortoData(this.currentYear);
  }
}

export const portoDataService = PortoDataService.getInstance();
