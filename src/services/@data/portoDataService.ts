
import { PortoData } from "@/@api/http/to-charts/porto/PortoData";
import { applyGenericFilters } from "@/utils/filters/@features/applyGenericFilters";

export class PortoDataService {
  private static instance: PortoDataService;
  private currentYear: string = "2024";

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

  private async fetchPortoData(filters: Record<string, any>) {
    const portoService = new PortoData(this.currentYear);

    const [atracacao, carga, origemDictionary, destinoDictionary, mercadoriaDictionary, coords, portosOperations] = await Promise.all([
        portoService.fetchAtracacaoPorAno(),
        portoService.fetchCargaPorAno(),
        portoService.fetchOrigemDictionary(),
        portoService.fetchDestinoDictionary(),
        portoService.fetchMercadoriaDictionary(),
        portoService.fetchCoordinates(),
        portoService.fetchPortosOperations()
      ]);
      
      const atracacaoFiltered = applyGenericFilters(atracacao, filters)

      const atracacaoIds = new Set(atracacaoFiltered.filteredData.map((atracacao) => atracacao.IDAtracacao));
      // console.log(atracacaoIds);

      const cargaFiltered = carga.filter((item) => atracacaoIds.has(item.IDAtracacao) && item['FlagMCOperacaoCarga'] === 1
      );
      console.log(cargaFiltered)

      console.log('TEM ALGUMA COISA ERRADA', {
        atracacao: atracacaoFiltered,
        carga: cargaFiltered,
        dictionaries:{ origem: origemDictionary, destino: destinoDictionary, mercado: mercadoriaDictionary},
        coords: coords,
      })

      return {
        atracacao: atracacaoFiltered,
        carga: cargaFiltered,
        rawData: { atracacao: atracacao, carga: carga},
        dictionaries:{ origem: origemDictionary, destino: destinoDictionary, mercado: mercadoriaDictionary},
        coords: coords,
        charts: { portos: portosOperations}
      };
  }



  public async fetchDataForTab(tab: string, filters: Record<string, any>) {

    let data;
    if (tab === "geral") {
      data = await this.fetchPortoData(filters);
    } else {
      data = await this.fetchPortoData(filters)
    }
  
    return data;
  }
}

export const portoDataService = PortoDataService.getInstance();
