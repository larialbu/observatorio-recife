import { DataEntry } from "../shared";

export interface PortoData {
    id: string;
    carga?: Record<string, any>[];
    rawData?: {
      atracacao?: Record<string, any>[];
      carga?: Record<string, any>[];
    };
    dictionaries?: Record<string, any>;
    charts?: Record<string, any>;
    coords?: [Record<string, any>[], number[]];
    atracacao?: DataEntry;
  }