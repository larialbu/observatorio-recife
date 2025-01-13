import { AeroportoData } from "@/@api/http/to-charts/aeroporto/AeroportoData";

export class AeroportoDataService {
  private static instance: AeroportoDataService;

  private constructor() {}

  public static getInstance(): AeroportoDataService {
    if (!AeroportoDataService.instance) {
      AeroportoDataService.instance = new AeroportoDataService();
    }
    return AeroportoDataService.instance;
  }

  private async fetchAenaData(year: string) {
    const aeroportoService = new AeroportoData(year);
    const [passageiros, cargas] = await Promise.all([
      aeroportoService.fetchProcessedAenaPassageirosData(),
      aeroportoService.fetchProcessedAenaCargasData()
    ]);
    return { passageiros, cargas };
  }

  private async fetchAnacData(year: string) {
    const aeroportoService = new AeroportoData(year);
    const [geral] = await Promise.all([
      aeroportoService.fetchProcessedData()
    ]);
    return [{ geral }];
  }

  public async fetchDataForTab(tab: string, year: string = "2024"): Promise<any> {
    let data;
    switch (tab) {
      case "aena":
        data = [await this.fetchAenaData(year)];
        break;
      case "geral":
      case "comparativo":
      case "embarque":
        data = await this.fetchAnacData(year);
        break;
      default:
        data = await this.fetchAnacData(year);
    }
    return data;
  }
}

export const aeroportoDataService = AeroportoDataService.getInstance();