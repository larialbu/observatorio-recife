import { fetchData } from "@/@api/config/dataFetcher";
import { PortoDataResult } from "@/@types/observatorio/@data/portoData";
import { PortoAtracacaoHeaders, PortoCargaHeaders, PortoCoordHeaders, PortoDestinoHeaders, PortoMercadoHeaders, PortoOrigemDestinoHeaders, PortoPassageirosHeaders } from "@/@types/observatorio/@fetch/porto";

export class PortoData {
  public year: string;
  private static cache: Record<string, PortoDataResult> = {};

  constructor(year: string) {
    this.year = year;
  }


  async fetchAtracacaoPorAno(): Promise<PortoAtracacaoHeaders[]> {
    const endpoint = `/porto/atracacao/${this.year}`;
    return fetchData<PortoAtracacaoHeaders[]>(endpoint, PortoData.cache);
  }

  async fetchCargaPorAno(): Promise<PortoCargaHeaders[]> {
    const endpoint = `/porto/carga/${this.year}`;
    return fetchData<PortoCargaHeaders[]>(endpoint, PortoData.cache);
  }

  async fetchPassageirosPorAno(): Promise<PortoPassageirosHeaders[]> {
    const endpoint = `/porto/passageiros/${this.year}`;
    return fetchData<PortoPassageirosHeaders[]>(endpoint, PortoData.cache);
  }

  async fetchOrigemDictionary(): Promise<PortoOrigemDestinoHeaders[]> {
    const endpoint = `/porto/dictionaries/origem`;
    return fetchData<PortoOrigemDestinoHeaders[]>(endpoint, PortoData.cache);
  }

  async fetchDestinoDictionary(): Promise<PortoDestinoHeaders[]> {
    const endpoint = `/porto/dictionaries/destino`;
    return fetchData<PortoDestinoHeaders[]>(endpoint, PortoData.cache);
  }

  async fetchMercadoriaDictionary(): Promise<PortoMercadoHeaders[]> {
    const endpoint = `/porto/dictionaries/mercadoria`;
    return fetchData<PortoMercadoHeaders[]>(endpoint, PortoData.cache);
  }

  async fetchCoordinates(): Promise<PortoCoordHeaders[]> {
    const endpoint= `/porto/charts/coords/${this.year}`;
    return fetchData<PortoCoordHeaders[]>(endpoint, PortoData.cache);
  }
}
