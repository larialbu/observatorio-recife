import { fetchData } from "@/@api/config/dataFetcher";

export class PortoData {
  public year: string;
  private static cache: Record<string, any> = {};

  constructor(year: string) {
    this.year = year;
  }


  async fetchAtracacaoPorAno(): Promise<any[]> {
    const endpoint = `/porto/atracacao/${this.year}`;
    return fetchData<any[]>(endpoint, PortoData.cache);
  }

  async fetchCargaPorAno(): Promise<any[]> {
    const endpoint = `/porto/carga/${this.year}`;
    return fetchData<any[]>(endpoint, PortoData.cache);
  }

  async fetchPassageirosPorAno(): Promise<any[]> {
    const endpoint = `/porto/passageiros/${this.year}`;
    return fetchData<any[]>(endpoint, PortoData.cache);
  }

  async fetchAtracacaoDictionaryPorAno(): Promise<any[]> {
    const endpoint = `/porto/dictionaries/atracacao/anos/${this.year}`;
    return fetchData<any[]>(endpoint, PortoData.cache);
  }

  async fetchCargaDictionaryPorAno(): Promise<any[]> {
    const endpoint = `/porto/dictionaries/carga/anos/${this.year}`;
    return fetchData<any[]>(endpoint, PortoData.cache);
  }

  async fetchOrigemDictionary(): Promise<any[]> {
    const endpoint = `/porto/dictionaries/origem`;
    return fetchData<any[]>(endpoint, PortoData.cache);
  }

  async fetchDestinoDictionary(): Promise<any[]> {
    const endpoint = `/porto/dictionaries/destino`;
    return fetchData<any[]>(endpoint, PortoData.cache);
  }

  async fetchMercadoriaDictionary(): Promise<any[]> {
    const endpoint = `/porto/dictionaries/mercadoria`;
    return fetchData<any[]>(endpoint, PortoData.cache);
  }

  async fetchCoordinates(): Promise<any[]> {
    const endpoint= `/porto/charts/coords/${this.year}`;
    return fetchData<any[]>(endpoint, PortoData.cache);
  }

  async fetchPortosOperations(): Promise<any[]> {
    const endpoint= `/porto/charts/coords/${this.year}`;
    return fetchData<any[]>(endpoint, PortoData.cache);
  }
}
