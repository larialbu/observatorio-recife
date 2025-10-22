import { fetchData } from "@/@api/config/dataFetcher";
import { AnacGeralHeaders } from "@/@types/observatorio/@fetch/aeroporto";

export class PanoramaData {
  private year: string;
  private static cache: Record<string, any> = {};

  constructor(year: string) {
    this.year = year;
  }

  async fetchProcessedDataAnac(): Promise<AnacGeralHeaders[]> {
    return fetchData<AnacGeralHeaders[]>(`/aeroporto/anac/anos/${this.year}`, PanoramaData.cache);
  }

  async fetchProcessedDataPib(): Promise<any[]> {
    const endpoint = `/pib/geral/anos`;
    return fetchData<any[]>(endpoint, []);
  }

  async fetchProcessedDataBalanca(): Promise<any[]> {
    return fetchData<any[]>(`/balanco-comercial/geral/${this.year}`, []);
  }

  async fetchProcessedEmpresasAtivas(): Promise<any[]> {
    const endpoint = `/empresas/empresas/anos/${this.year}`;
    return fetchData<any[]>(endpoint, []);
  }

  async fetchProcessedDataCaged(): Promise<any[]> {
    const endpoint = `/empregos/caged/anos/${this.year}`;
    return fetchData<any[]>(endpoint, []);
  }

  async fetchProcessedGeralDataIpca(): Promise<any[]> {
    const endpoint = `/ipca/geral/anos/${this.year}`;
    return fetchData<any[]>(endpoint, []);
  }

  clearCache(): void {
    PanoramaData.cache = {};
  }
}
