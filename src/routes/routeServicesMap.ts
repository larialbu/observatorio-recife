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
import { combustiveisDataService } from "@/services/@data/combustiveisDataService";

export const routeServicesMap: Record<string, Record<string, any>> = {
  "/observatorio/ipca": {
    geral: ipcaDataService,
    grupos: ipcaDataService,
    analitico: ipcaDataService,
  },

  "/observatorio/portos": {
    geral: portoDataService,
    operacao: portoDataService,
    comparativo: portoDataService,
    passageiro: portoDataService,
    passageiros: portoDataService,
  },

  "/observatorio/porto": {
    geral: portoDataService,
    operacao: portoDataService,
    comparativo: portoDataService,
    passageiro: portoDataService,
    passageiros: portoDataService,
  },

  "/observatorio/ranking": {
    geral: rankingDataService,
    dimensao: rankingDataService,
    pilar: rankingDataService,
    indicador: rankingDataService,
  },

  "/observatorio/ranking-municipios": {
    geral: rankingDataService,
    dimensao: rankingDataService,
    pilar: rankingDataService,
    indicador: rankingDataService,
  },

  "/observatorio/aeroportos": {
    geral: aeroportoDataService,
    comparativo: aeroportoDataService,
    embarque: aeroportoDataService,
    aena: aeroportoDataService,
  },

  "/observatorio/pib": {
    geral: pibDataService,
    comparativo: pibDataService,
    capita: pibDataService,
  },

  "/observatorio/balanca-comercial": {
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
    "empresas-ativas-inativas": empresasDataService,
    "empresas-naturezas": empresasDataService,
    "empresas-classes": empresasDataService,
    "comparativo-empresas-classes": empresasDataService,
    "empresas-abertas-fechadas": empresasDataService,
    "empresas-tempo-abertura": empresasDataService,
  },

  "/observatorio/combustiveis": {
    geral: combustiveisDataService,
    comparativo: combustiveisDataService,
    regional: combustiveisDataService,
    estadual: combustiveisDataService,
    municipal: combustiveisDataService,
  },
};
