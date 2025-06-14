import { DataWithFilters } from "../shared";
import { AnacGeralHeaders, AenaCargasHeaders, AenaPassageirosHeaders } from "../@fetch/aeroporto";

  
export interface AnacAeroportoData {
  id: "anac";
  geral: AnacGeralData;
}

export type AnacGeralData = DataWithFilters<AnacGeralHeaders>;

export interface AenaAeroportoData {
  id: "aena";
  passageiros: AenaPassageirosData;
  cargas: AenaCargasData
}

export interface AenaPassageirosData extends DataWithFilters<AenaPassageirosHeaders> {
  reduce(arg0: (total: number, item: AenaPassageirosHeaders) => number, arg1: number): number;
  rawDataPassageiros: AenaPassageirosHeaders[];
}

export interface AenaCargasData extends DataWithFilters<AenaCargasHeaders> {
  reduce(arg0: (total: number, item: AenaCargasHeaders) => number, arg1: number): number;
  reduce(arg0: (total: number, item: AenaCargasHeaders) => number, arg1: number): number;
  rawDataCargas: AenaCargasHeaders[];
}

export type AeroportoDataResult = AnacAeroportoData | AenaAeroportoData;