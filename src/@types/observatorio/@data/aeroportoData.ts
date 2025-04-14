import { AdditionalFilter, DataWithFilters } from "../shared";
import { AnacGeralHeaders, AenaCargasHeaders, AenaPassageirosHeaders } from "../@fetch/aeroporto";

export interface AnacEntry {
    additionalFiltersOptions: AdditionalFilter[];
    filteredData: AnacGeralHeaders[];
    rawData: AnacGeralHeaders[];
}
  
export interface AnacAeroportoData {
  id: "anac";
  geral: AnacEntry;
}

export interface AnacGeralData extends DataWithFilters<AnacGeralHeaders>{}

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