
import { fetchData } from "@/@api/config/dataFetcher";

const DB_NAME = "parquetDB";
const STORE_NAME = "parquetFiles";

export class EmpresasData {
  private year: string;
  private static cache: Record<string, any> = {}; // Cache estático para todas as instâncias

  constructor(year: string) {
    this.year = year;
  }

  // tab1
  async fetchProcessedEmpresasAtivasRecife(): Promise<any[]> {
    const endpoint = `/empresas/empresas-ativas/anos/${this.year}`;
    return fetchData<any[]>(endpoint, EmpresasData.cache);
  }

  // tab2
  async fetchProcessedEmpresasAtivas(): Promise<any[]> {
    const endpoint = `/empresas/empresas/anos/${this.year}`;
    return fetchData<any[]>(endpoint, EmpresasData.cache);
  }

  // tab3
  async fetchProcessedEmpresasInativas(): Promise<any[]> {
    const endpoint = `/empresas/empresas-inativas/anos/${this.year}`;
    return fetchData<any[]>(endpoint, EmpresasData.cache);
  }

  // tab4 -> vai ser o fetch 3 e 2

  // tab5
  async fetchProcessedNaturezas(): Promise<any[]> {
    const endpoint = `/empresas/atividades-natureza/anos/${this.year}`;
    return fetchData<any[]>(endpoint, EmpresasData.cache);
  }

  // tab6 e tab7
  async fetchProcessedClasses(): Promise<any[]> {
    const endpoint = `/empresas/atividades-classe/anos/${this.year}`;
    return fetchData<any[]>(endpoint, EmpresasData.cache);
  }

  // tab8
  async fetchProcessedEmpresasAbertas(): Promise<any[]> {
    const endpoint = `/empresas/empresas-abertas/anos/${this.year}`;
    return fetchData<any[]>(endpoint, EmpresasData.cache);
  }

  // tab8
  async fetchProcessedEmpresasFechadas(): Promise<any[]> {
    const endpoint = `/empresas/empresas-fechadas/anos/${this.year}`;
    return fetchData<any[]>(endpoint, EmpresasData.cache);
  }

  // tab9
  async fetchProcessedTempoMedio(): Promise<any[]> {
    const endpoint = `/empresas/tempo-medio/anos/${this.year}`;
    return fetchData<any[]>(endpoint, EmpresasData.cache);
  }

  
  // async fetchProcessedDataCaged(): Promise<any[]> {
  //   const endpoint = `/empregos/caged/anos/${this.year}`;
  //   return fetchData<any[]>(endpoint, EmpresasData.cache);
  // }

  // async fetchProcessedDataCagedDesemprego(): Promise<any[]> {
  //   const endpoint = `/empregos/desemprego/anos/${this.year}`;
  //   return fetchData<any[]>(endpoint, EmpresasData.cache);
  // }

  // Limpa o cache de dados
  clearCache(): void {
    EmpresasData.cache = {};
  }
}

