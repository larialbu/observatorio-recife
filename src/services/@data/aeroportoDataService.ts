import { AeroportoData } from "@/@api/http/to-charts/aeroporto/AeroportoData";
import { applyGenericFilters } from "@/utils/filters/applyGenericFilters";

export const aeroportoDataService = {
  fetchDataForTab: async (tab: string, year: string, filters: Record<string, any> = {}) => {
    const aeroportoData = new AeroportoData(year);

    try {
      let data: any[] = [];

      switch (tab) {
        case "aena-passageiros":
          data = await aeroportoData.fetchProcessedAenaPassageirosData();
          break;
        case "aena-cargas":
          data = await aeroportoData.fetchProcessedAenaCargasData();
          break;
        case "anac":
        default:
          data = await aeroportoData.fetchProcessedData();
          break;
      }

      if (!data || data.length === 0) {
        console.warn("Dados brutos estão vazios:", data);
        return { rawData: [], filteredData: [] };
      }

      console.log("Dados brutos carregados:", data);

      const filteredData = applyGenericFilters(data, filters);
      console.log("Dados filtrados retornados:", filteredData);

      return {
        rawData: data,
        filteredData,
      };
    } catch (error) {
      console.error(`Erro ao buscar dados para a aba ${tab}:`, error);
      throw error;
    }
  },
};
