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
  rawDataPassageiros: AenaPassageirosHeaders[];
}

export interface AenaCargasData extends DataWithFilters<AenaCargasHeaders> {
  rawDataCargas: AenaCargasHeaders[];
}

export type AeroportoDataResult = AnacAeroportoData | AenaAeroportoData;