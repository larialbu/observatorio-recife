import { BalancaHeaders } from "../@fetch/balanca-comercial";
import { DataWithFilters } from "../shared";

export interface BalancaEntry extends DataWithFilters<BalancaHeaders> {
    rawData?: BalancaHeaders[];
}
  
export interface BalancaGeralData {
    id: "balanca";
    geral: BalancaEntry;
}
  