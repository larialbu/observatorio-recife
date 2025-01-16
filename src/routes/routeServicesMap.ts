import { aeroportoDataService } from "@/services/@data/aeroportoDataService";
import { balancaDataService } from "@/services/@data/balancaComercialDataService";
// (supondo que você tenha criado um balancaDataService)

export const routeServicesMap: Record<
  string,  // rota, ex. "/observatorio/aeroportos"
  Record<string, any> // tab => service
> = {
  // Aeroportos
  "/observatorio/aeroportos": {
    geral: aeroportoDataService,
    comparativo: aeroportoDataService,
    embarque: aeroportoDataService,
    aena: aeroportoDataService,
    // etc. Se quiser mesmo service, ok
  },

  // Balança Comercial
  "/observatorio/balanca-comercial": {
    // Se tiver tabs diferentes ("geral", "analitico", etc.), aponte para balancaDataService
    geral: balancaDataService,
    analitico: balancaDataService,
  },

  // E assim por diante ...
};
