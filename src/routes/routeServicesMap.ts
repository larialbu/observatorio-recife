import { aeroportoDataService } from "@/services/@data/aeroportoDataService";
import { balancaDataService } from "@/services/@data/balancaComercialDataService";
import { ipcaDataService } from "@/services/@data/ipcaDataService";
import { portoDataService } from "@/services/@data/portoDataService";
import { rankingDataService } from "@/services/@data/rankingDataService";
import { pibDataService } from "@/services/@data/pibDataService"; // Importa o pibDataService

export const routeServicesMap: Record<
  string,  // rota, ex. "/observatorio/aeroportos"
  Record<string, any> // tab => service
> = {
  // Aeroportos
  "/observatorio/ipca": {
    geral: ipcaDataService,
    grupos: ipcaDataService,
    analitico: ipcaDataService,
    // etc. Se quiser mesmo service, ok
  },
  "/observatorio/portos": {
    geral: portoDataService,
    operacao: portoDataService,
    comparativo: portoDataService,
    passageiros: portoDataService,
    // etc. Se quiser mesmo service, ok
  },
  "/observatorio/ranking": {
    geral: rankingDataService,
    dimensao: rankingDataService,
    pilar: rankingDataService,
    indicador: rankingDataService,
    // etc. Se quiser mesmo service, ok
  },
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
  // PIB
  "/observatorio/pib": {
    geral: pibDataService, // Aba "Geral" para PIB total, variação, rankings e evolução
    per_capita: pibDataService, // Aba "Per Capita" para PIB per capita
  },
  // E assim por diante ...
};