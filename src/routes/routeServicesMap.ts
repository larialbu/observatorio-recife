import { Service } from "@/@types/observatorio/shared";
import { aeroportoDataService } from "@/services/@data/aeroportoDataService";
import { balancaDataService } from "@/services/@data/balancaComercialDataService";
import { empregosDataService } from "@/services/@data/empregosDataService";
import { empresasDataService } from "@/services/@data/empresasDataService";
import { ipcaDataService } from "@/services/@data/ipcaDataService";
import { microCagedDataService } from "@/services/@data/microCagedService";
import { pibDataService } from "@/services/@data/pibDataService";
import { portoDataService } from "@/services/@data/portoDataService";
import { raisDataService } from "@/services/@data/raisDataService";
import { rankingDataService } from "@/services/@data/rankingDataService";

export const routeServicesMap: Record<
  string,
  Record<string, Service<any>>
> = {
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
      passageiro: portoDataService,
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

  // Pib
  "/observatorio/pib": {
    // Se tiver tabs diferentes ("geral", "analitico", etc.), aponte para balancaDataService
    geral: pibDataService,
    comparativo: pibDataService,
    capita: pibDataService,
  },

  // Balança Comercial
  "/observatorio/balanca-comercial": {
    // Se tiver tabs diferentes ("geral", "analitico", etc.), aponte para balancaDataService
    geral: balancaDataService,
    analitico: balancaDataService,
  },

  "/observatorio/empregos": {
    geral: empregosDataService,
    comparativo: empregosDataService,
    desemprego: empregosDataService,
  },

  "/observatorio/rais": {
    geral: raisDataService,
    desligamento: raisDataService,
    diversidade: raisDataService,
    grupo: raisDataService,
    estoque: raisDataService,
    remuneracao: raisDataService,
  },
  
  "/observatorio/micro-caged": {
    geral: microCagedDataService,
    saldo: microCagedDataService,
    media: microCagedDataService,
    "comparativo-mov": microCagedDataService,
    "comparativo-med": microCagedDataService,
    salario: microCagedDataService,
  },

  "/observatorio/empresas": {
    geral: empresasDataService,
    "empresas-ativas": empresasDataService,
    "empresas-inativas": empresasDataService,
    "empresas-ativas-inativas": empresasDataService
    // saldo: empresasGeralFilters,
    // media: empresasGeralFilters,
    // "comparativo-mov": empresasGeralFilters,
    // "comparativo-med": empresasGeralFilters,
    // salario: empresasGeralFilters,
  },
   
  // E assim por diante ...
};
