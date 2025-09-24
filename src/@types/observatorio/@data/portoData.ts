import { PortoAtracacaoHeaders, PortoCargaHeaders, PortoDestinoHeaders, PortoMercadoHeaders, PortoOrigemDestinoHeaders, PortoPassageirosHeaders, PortoCoordHeaders, PortoMeses } from "../@fetch/porto";
import { DataWithFilters } from "../shared";

export interface PortoGeralData {
  id: "porto";
  // atracacao: DataWithFilters<PortoAtracacaoHeaders> | PortoAtracacaoHeaders[];
  // carga: PortoCargaHeaders[];
  // accumulated?: PortoAtracacaoHeaders[] | { filteredData: PortoAtracacaoHeaders[] };
  months?: PortoMeses;
  accumulated : { [key: string]: { [key: string]: number | { [key: string]: number   }} } | any[] | DataWithFilters<any>;
  coords: [PortoCoordHeaders[], number[]];
  dictionaries: {
    origem: PortoOrigemDestinoHeaders[];
    destino: PortoDestinoHeaders[];
    mercado: PortoMercadoHeaders[];
  };
  rawData: RawDataPortos;
}

export interface RawDataPortos {
    // atracacao: PortoAtracacaoHeaders[];
    // carga: PortoCargaHeaders[];
    accumulated: any
}

export interface PortoOperacaoData {
    acao: "Cabotagem" | "Total" | "Importação" | "Exportação" | "Outros";
    cargas: PortoCargaHeaders[];
    totalPeso: number;
}

export interface PassageirosPortoAno extends DataWithFilters<PortoPassageirosHeaders> {}

export interface PortoPassageirosData {
    current: PassageirosPortoAno;
    past: PassageirosPortoAno;
}
  
export interface PortoPassageirosResult {
    id?: "porto-passageiros";
    passageiros: PortoPassageirosData
}

export interface PortoPassageirosCardData {
  current?: number;
  past?: number;
  variant?: number | string;
}

export interface PortoPassageirosOutputData extends PortoPassageirosCardData {
  passageiros: {
    current: PortoPassageirosHeaders[];
    past: PortoPassageirosHeaders[];
  }
}

export type PortoDataResult = PortoGeralData | PortoPassageirosResult;