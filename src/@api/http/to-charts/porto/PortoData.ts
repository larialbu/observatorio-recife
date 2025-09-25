import { fetchData } from "@/@api/config/dataFetcher";
import { PortoDataResult } from "@/@types/observatorio/@data/portoData";
import { PortoAtracacaoHeaders, PortoCargaHeaders, PortoCoordHeaders, PortoDestinoHeaders, PortoMercadoHeaders, PortoOrigemDestinoHeaders, PortoPassageirosHeaders } from "@/@types/observatorio/@fetch/porto";

export class PortoData {
  public year: string;
  private static cache: Record<string, PortoDataResult> = {};

  constructor(year: string) {
    this.year = year;
  }

  async fetchPortoPorAno(): Promise<PortoCargaHeaders[]> {
    const endpoint = `/porto/carga-atracacao/${this.year}`;
    return fetchData<PortoCargaHeaders[]>(endpoint, PortoData.cache);
  }

  async fetchCoordinates(): Promise<PortoCoordHeaders[]> {
    const endpoint= `/porto/charts/coords/${this.year}`;
    return fetchData<PortoCoordHeaders[]>(endpoint, PortoData.cache);
  }  
  
  async fetchPassageirosPorAno(): Promise<PortoPassageirosHeaders[]> {
    const endpoint = `/porto/passageiros/${this.year}`;
    return fetchData<PortoPassageirosHeaders[]>(endpoint, PortoData.cache);
  }
}
